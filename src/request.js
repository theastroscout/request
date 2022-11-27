/*

Request Module

*/

const https = require('https');
const http = require('http');
const zlib = require('node:zlib');

let request = settings => {

	let {
		url,
		port = false,
		method = "POST",
		params = "",
		auth = false,
		headers = false
	} = settings;

	return new Promise(resolve => {

		/*

		Parse URL

		*/
		
		try {
			url = new URL(url);
		} catch(e){
			url = false;
		}

		if(url === false){
			console.log("@Surfy/Request: Can't parse URL");
			resolve(false);
			return false;
		}
		
		/*

		Post Data

		*/
		
		let postData = params;
		if(typeof postData !== "string"){
			postData = JSON.stringify(postData);
		}

		/*

		Contruct options

		*/
		
		let options = {
			hostname: url.hostname,
			port: port ? port : url.protocol === "https:" ? 443 : 80,
			path: url.pathname,
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(postData)
			}
		};

		/*

		Authorization

		*/

		if(auth){
			options.headers.Authorization = auth;
		}

		/*

		Headers

		*/

		if(headers){
			for(let header in headers){
				options.headers[header] = headers[header];
			}
		}

		/*

		Processing Quries for GET Request

		*/

		if(method === 'GET'){
			let query = Object.entries(params).map(v => v[0]+'='+encodeURIComponent(v[1])).join("&");
			options.path += "?"+query;
			delete options.headers['Content-Length'];
		}

		/*

		Choose a driver

		*/

		let driver = url.protocol === "https:" ? https : http;
		
		/*

		Request

		*/

		const req = driver.request(options,
			res => {
				
				let chunks = [];

				res.on("data", chunk => {
					chunks.push(chunk);
				});

				res.on("end", () => {
					let data = Buffer.concat(chunks);

					/*

					Decompress JSON Data

					*/
					
					if(res.headers['content-encoding'] === 'gzip'){
						data = zlib.gunzipSync(data);
					}
					
					/*

					Parse JSON

					*/

					if(/json/.test(res.headers['content-type'])){
						try {
							data = JSON.parse(data.toString());
						} catch(e){
							// Continue regardless error
						}
					}

					resolve(data);
				});
			}
		);

		/*

		Error Handler

		*/

		req.on("error", e => {
			console.error(`@Surfy/Request Error: ${e.message}`);			
			resolve(false);
		});

		if(method === "POST"){
			req.write(postData);
		}

		req.end();
	});
};

module.exports = request;