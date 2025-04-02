import net from "net";

const tcpServer = net.createServer((socket: net.Socket) => {
  let accumulatedData: Buffer[] = []; // Array to accumulate buffers

  // The "data" event listener is asynchronous, meaning the code inside it will only run after the event is triggered (i.e., after the data is received over the TCP connection).
  socket.on("data", (chunk: Buffer<ArrayBufferLike>) => {
    accumulatedData.push(chunk); // Accumulate each chunk (Buffer)

    const dataBuffer: Buffer<ArrayBuffer> = Buffer.concat(accumulatedData); // Combine all buffers into a single buffer
    console.log({ dataBuffer }); // displays the content (Uint8 values) in hexadecimal format because it's a common way to represent raw binary data in Node.js

    const headerEndIndex = dataBuffer.indexOf("\r\n\r\n"); // The headers end with \r\n\r\n

    // process the HTTP request header
    if (headerEndIndex !== -1) {
      const requestHeaders: string = dataBuffer
        .slice(0, headerEndIndex)
        .toString();
        console.log({ requestHeaders })
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
});

tcpServer.listen(4221, "localhost", () => {
  console.log("TCP server is listening on port 4221");
});
