import net from "net";

// The server can be a TCP server or an IPC server, depending on what it listen() to
const tcpServer = net.createServer((socket: net.Socket) => {
  /* 
    sending TCP response,
    it's still not exactly HTTP response; While the data follows the HTTP response format (HTTP/1.1 200 OK\r\n\r\n), it does not behave like a full HTTP server.
    A real HTTP server should handle request parsing, different HTTP methods (GET, POST), headers, and more. 
  */
  socket.write(Buffer.from("HTTP/1.1 200 OK\r\n\r\n"));
  socket.on("close", () => {
    socket.end();
  });
});

tcpServer.listen(4221, "localhost", () => {
  console.log("TCP server is listening on port 4221");
});
