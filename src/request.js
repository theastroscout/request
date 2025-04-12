import https from 'https';
import http from 'http';
import zlib from 'node:zlib';

const request = ({
	url,
	port = false,
	method = 'POST',
	params = '',
	auth = false,
	headers = false,
	timeout = 2000
}) => {
	return new Promise(resolve => {
		try {
			url = new URL(url);
		} catch (e) {
			console.log('@Surfy/request: Can\'t parse URL');
			resolve(false);
			return;
		}

		if (url.port) {
			port = url.port;
		}

		let postData = params;
		if (typeof postData !== 'string') {
			postData = JSON.stringify(postData);
		}

		const options = {
			hostname: url.hostname,
			port: port || (url.protocol === 'https:' ? 443 : 80),
			path: url.pathname,
			method,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(postData)
			},
			timeout
		};

		if (auth) {
			options.headers.Authorization = auth;
		}

		if (headers) {
			for (const header in headers) {
				options.headers[header] = headers[header];
			}
		}

		if (method === 'GET') {
			options.headers['Content-Type'] = 'x-www-form-urlencoded';
			const query = Object.entries(params)
				.map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
				.join('&');
			options.path += `?${query}`;
			delete options.headers['Content-Length'];
		}

		const driver = url.protocol === 'https:' ? https : http;
		const req = driver.request(options, res => {
			const chunks = [];

			res.on('data', chunk => {
				chunks.push(chunk);
			});

			res.on('end', () => {
				let data = Buffer.concat(chunks);

				if (res.headers['content-encoding'] === 'gzip') {
					data = zlib.gunzipSync(data);
				}

				let encoding = 'utf-8';
				const contentType = res.headers['content-type'];
				const matches = /charset=([^;]+)/i.exec(contentType);
				if (matches?.[1]) {
					encoding = matches[1].toLowerCase();
					if (encoding === 'iso-8859-1') encoding = 'latin1';
				}

				data = data.toString(encoding);

				if (/json/.test(res.headers['content-type'])) {
					try {
						data = JSON.parse(data);
					} catch {}
				}

				resolve(data);
			});
		});

		req.on('error', e => {
			console.error(`@Surfy/request Error: ${e.message}`);
			resolve(false);
		});

		req.setTimeout(timeout, () => {
			console.error(`@Surfy/request Timeout after ${timeout}ms`);
			req.abort();
			resolve(false);
		});

		if (method === 'POST') {
			req.write(postData);
		}

		req.end();
	});
};

export default request;
