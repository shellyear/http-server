# HTTP response

### An HTTP response is made up of three parts, each separated by a CRLF (\r\n):

1. Status line.
2. Zero or more headers, each ending with a CRLF.
3. Optional response body.

- Here's the response that my server sends: HTTP/1.1 200 OK\r\n\r\n
- Here's a breakdown of the response:

  ```js
  // Status line
  HTTP/1.1  // HTTP version
  200       // Status code
  OK        // Optional reason phrase
  \r\n      // CRLF that marks the end of the status line

  // Headers (empty)
  \r\n      // CRLF that marks the end of the headers

  // Response body (empty)
  ```


- Here's an example of an HTTP response (with body)

```js
HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 3\r\n\r\nabc
```

```js
// Status line
HTTP/1.1 200 OK
\r\n                          // CRLF that marks the end of the status line

// Headers
Content-Type: text/plain\r\n  // Header that specifies the format of the response body
Content-Length: 3\r\n         // Header that specifies the size of the response body, in bytes
\r\n                          // CRLF that marks the end of the headers

// Response body
abc                           // The string from the request
```


***Sources***
1. http responses - https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_responses
2. http specification - https://datatracker.ietf.org/doc/html/rfc9112#name-message