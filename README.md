# Request.js
The simplest and lightest Node.js module for sending Post or Get Requests.
You can use both HTTPS as well as HTTP for your own purposes.

<br/>

## Installation
```
npm install @surfy/request
```

## Usage with Node.js
The module will try to convert the received information into JSON.
If it fails output Plain Text.

```js

// Import library
import request from "@surfy/request";

/*

Request Options

*/

let options = {

	// Full requested URL without queries
	url: "https://example.com",

	// Specific Port
	// If not specified, set based on protocol: https 443, http 80
	port: 587,

	// Request Method
	// Values: "GET" or "POST"
	// Default "POST"
	method: "GET",

	// Query params
	// Object or String
	// Default {}
	params: {
		firstParam: "firstValue",
		secondParam: "secondValue"
	},

	// Authorization header, Default False

	auth: "AUTH_STRING",

	// Additional Headers, Default False

	headers: {
		"-x-your-header-param": "Some value",

		// You can override Content-Type, Default "application/json"
		"Content-Type": "application/x-www-form-urlencoded"
	}
};

// Send Request
// Result: JSON or Buffer, but False if error has occurred

const result = await request(options);

```

<br />
<br />

# License

CC0 1.0 Universal (CC0 1.0) Public Domain Dedication

The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighbouring rights, to the extent allowed by law.

You can copy, modify, distribute, and perform the work, even for commercial purposes, all without asking permission.

The work is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the work or the use or other dealings in the work.

For more information, see <https://creativecommons.org/publicdomain/zero/1.0/>

- [Surfy Foundation](https://hello.surfy.one)
- [LinkedIn](https://www.linkedin.com/in/astroscout/)