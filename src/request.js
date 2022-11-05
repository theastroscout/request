/*

Request Module

*/

const https = require("https");
const http = require("http");

let request = settings => {

	let {
		url,
		method = "POST",
		params,
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
			console.log("Request: Can't parse URL");
			resolve(false);
			return false;
		}
		
		/*

		Post Data

		*/
		
		const postData = params;
		if(typeof postData !== "string"){
			postData = JSON.stringify(postData);
		}

		/*

		Contruct options

		*/
		
		let options = {
			hostname: url.hostname,
			port: url.protocol === "https:" ? 443 : 80,
			path: url.pathname,
			method: method,
			headers: {
				"Content-Type": "application/json",
				"Content-Length": Buffer.byteLength(postData)
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

		if(method === "GET"){
			let query = Object.entries(params).map(v => v.join("=")).join("&");
			options.path += "?"+encodeURI(query);
			delete options.headers["Content-Length"];
		}

		/*

		Choose a drive

		*/

		let driver = url.protocol === "https:" ? https : http;
		
		/*

		Request

		*/

		const req = driver.request(options,
			res => {
				res.setEncoding("utf8");
				
				let data = "";

				res.on("data", chunk => {
					data+=chunk;
				});

				res.on("end", () => {

					try {
						data = JSON.parse(data);
					} catch(e){
						// Continue regardless error
					}

					resolve(data);
				});
			}
		);

		/*

		Error Handler

		*/

		req.on("error", e => {
			console.error(`Request: ${e.message}`);			
			resolve(false);
		});

		if(method === "POST"){
			req.write(postData);
		}

		req.end();
	});
};

module.exports = request;