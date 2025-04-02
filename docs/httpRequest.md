# HTTP request

***HTTP request structure***

- An HTTP request is made up of three parts, each separated by a CRLF (\r\n):

1. Request Line:
- The HTTP method (e.g., GET, POST, PUT) is the first part of the request.
- This is followed by the request target (like a URL or path).
- Then comes the HTTP version (e.g., HTTP/1.1).
- has CRLF at the end
```js
GET /index.html HTTP/1.1
```

2. Headers:
- After the request line, HTTP headers are included, like Host, User-Agent, Accept, etc.
- These headers ***do not need to be in any specific order***, but the ***request method itself must always come first.***
- ***Host: www.example.com*** host header is mandatory in the request, as it specifies the domain name of the server.
- ***Content-Type: application/json*** For methods like POST or PUT, the ***Content-Type** header is generally required to specify the format of the request body.
- ***Content-Length: 123*** If there is a body in the request (like with POST or PUT), the ***Content-Length*** header is typically required to indicate the size of the body.
- OPTIONAL HEADERS: User-Agent, Accept, Authorization etc. 
They are not required for a minimal valid response, but should be used depending on specific requirements of the request and response (User-Agent specifies client software making request, Accept specifies the media types the client can handle, Authorization is used when sending credentials, if authentication is required)
- each header has CRLF at the end, and + CRLF at the end of whole headers section

3. Body (optional):
- For methods like POST, PUT, or PATCH, there may also be a body after the headers.


- Here's an example of an HTTP request (without body):

```js
GET /index.html HTTP/1.1\r\nHost: localhost:4221\r\nUser-Agent: curl/7.64.1\r\nAccept: */*\r\n\r\n
```

- Here's a breakdown of the request:

```js
// Request line
GET                          // HTTP method
/index.html                  // Request target
HTTP/1.1                     // HTTP version
\r\n                         // CRLF that marks the end of the request line

// Headers
Host: localhost:4221\r\n     // Header that specifies the server's host and port
User-Agent: curl/7.64.1\r\n  // Header that describes the client's user agent
Accept: */*\r\n              // Header that specifies which media types the client can accept
\r\n                         // CRLF that marks the end of the headers

// Request body (empty)
```

