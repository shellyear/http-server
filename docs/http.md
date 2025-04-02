# HTTP

- HTTP is an application-layer protocol that defines how messages should be formatted.
- It relies on TCP (a transport-layer protocol) to handle the actual data transmission.
- When an HTTP request or response is sent, it’s just a formatted text string that gets transmitted over a TCP connection.
- A real HTTP server should handle request parsing, different HTTP methods (GET, POST), headers, and more.

```js
/* 
    sending TCP response,
    it's still not exactly HTTP response; While the data follows the HTTP response format (HTTP/1.1 200 OK\r\n\r\n), it does not behave like a full HTTP server.
    A real HTTP server should handle request parsing, different HTTP methods (GET, POST), headers, and more. 
*/
const tcpServer = net.createServer((socket) => {
    socket.write(Buffer.from("HTTP/1.1 200 OK\r\n\r\n"));
    socket.on("close", () => {
        socket.end();
    });
})
```
