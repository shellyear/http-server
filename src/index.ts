import net from "net";

// The server can be a TCP server or an IPC server, depending on what it listen() to
const tcpServer = net.createServer((socket: net.Socket) => {
  let accumulatedData: Buffer[] = []; // Array to accumulate buffers

  // The "data" event listener is asynchronous, meaning the code inside it will only run after the event is triggered (i.e., after the data is received over the TCP connection).
  socket.on("data", (chunk: Buffer<ArrayBufferLike>) => {
    accumulatedData.push(chunk); // Accumulate each chunk (Buffer)

    const dataBuffer: Buffer<ArrayBuffer> = Buffer.concat(accumulatedData); // Combine all buffers into a single buffer
    console.log({ dataBuffer });

    const headerEndIndex = dataBuffer.indexOf("\r\n\r\n"); // The headers end with \r\n\r\n

    // process the HTTP request header
    if (headerEndIndex !== -1) {
      const requestHeaders: string = dataBuffer
        .slice(0, headerEndIndex)
        .toString();
      //dataBuffer.slice(0, headerEndIndex).toString();
      const request = chunk.toString(); // Convert buffer (array of bytes) to string (UTF-8 is the default encoding)
      const path = request.split(" ")[1];
      const response =
        path === "/"
          ? "HTTP/1.1 200 OK\r\n\r\n"
          : "HTTP/1.1 404 Not Found\r\n\r\n";
      socket.write(response);
      socket.end(); // sends FIN packet
    }
  });
  /* 
    sending TCP response,
    it's still not exactly HTTP response; While the data follows the HTTP response format (HTTP/1.1 200 OK\r\n\r\n), it does not behave like a full HTTP server.
    A real HTTP server should handle request parsing, different HTTP methods (GET, POST), headers, and more. 
  */
  //   socket.write(Buffer.from("HTTP/1.1 200 OK\r\n\r\n"));
  //   socket.on("close", () => {
  //     socket.end();
  //   });
});

tcpServer.listen(4221, "localhost", () => {
  console.log("TCP server is listening on port 4221");
});
