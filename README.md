# Request.js
A minimal Node.js module for sending HTTP or HTTPS GET and POST requests with ease.

<br/>

## Installation
```
npm install @surfy/request
```

## Usage
The module attempts to parse the response as JSON. If parsing fails, the raw text or buffer is returned.

```js
import request from "@surfy/request";

const options = {
	// Full URL (without query string)
	url: "https://example.com",

	// Optional port (default: 443 for HTTPS, 80 for HTTP)
	port: 587,

	// HTTP method: "GET" or "POST" (default: "POST")
	method: "GET",

	// Query parameters (object or query string)
	params: {
		firstParam: "firstValue",
		secondParam: "secondValue"
	},

	// Optional Authorization header
	auth: "AUTH_STRING",

	// Additional headers
	headers: {
		"-x-your-header-param": "Some value",
		"Content-Type": "application/x-www-form-urlencoded" // override default
	}
};

// Send request
const result = await request(options); // Returns parsed JSON, Buffer, or false on error

```

<br />
<br />

# License

CC0 1.0 Universal (Public Domain Dedication)

You may copy, modify, distribute, and use this work for any purpose, without permission.
Provided "as is", without any warranty.

More info: https://creativecommons.org/publicdomain/zero/1.0/

- [Surfy Foundation](https://hello.surfy.one)
- [LinkedIn](https://www.linkedin.com/in/astroscout/)