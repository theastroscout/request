/*

Testing Request Module

*/

process.env.test = true;
const request = require("../src/request");

let test = async () => {
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
	
	console.log(result);
};

test();