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
