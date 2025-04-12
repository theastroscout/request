/*

CommonJS Module

*/

async function request(path, output) {
	const { default: runRequest } = await import("./request.js");
	return runRequest(path, output);
}

module.exports = request;