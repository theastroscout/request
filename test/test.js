/*

Testing Request Module

*/

process.env.test = true;
const request = require("../src/request");
const querystring = require("node:querystring");

let test1 = async () => {
	let result = await request({
		url: "https://surfy.one",
		method: "GET",
		params: {
			search: "Surfy"
		},
		auth: "",
		headers: {
			"-x-key": "Some key"
		}
	});
	
	console.log("Result", JSON.stringify(result, null, "\t"));
};

test1();

let test2 = async () => {
	let options = {
		url: "https://overpass.kumi.systems/api/interpreter",
		method: "POST",
		headers: {
			"User-Agent": "Alexander Yermolenko i@surfy.one, https://qrious.uk",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		params: querystring.stringify({data: `[out:json];node(50.745,7.17,50.75,7.18)[highway=bus_stop];out;`})
	};

	let result = await request(options);
	console.log("GEO Result", JSON.stringify(result, null, "\t"));
}

test2();