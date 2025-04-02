import net from "net";

const tcpServer = net.createServer((socket: net.Socket) => {
  let accumulatedData: Buffer[] = []; // Array to accumulate buffers

  // The "data" event listener is asynchronous, meaning the code inside it will only run after the event is triggered (i.e., after the data is received over the TCP connection).
  socket.on("data", (chunk: Buffer<ArrayBufferLike>) => {
    accumulatedData.push(chunk); // Accumulate each chunk (Buffer)

    const dataBuffer: Buffer<ArrayBuffer> = Buffer.concat(accumulatedData); // Combine all buffers into a single buffer
    console.log({ dataBuffer }); // displays the content (Uint8 values) in hexadecimal format because it's a common way to represent raw binary data in Node.js

    const headerEndIndex = dataBuffer.indexOf("\r\n\r\n"); // The headers end with \r\n\r\n
    console.log(headerEndIndex);
    // process the HTTP request header
    if (headerEndIndex !== -1) {
      const dataStr = dataBuffer.toString();
      const requestLine = dataStr.split("\r\n")[0];
      const [method, path, version] = requestLine.split(" ");

      const pathSegments = path.split("/");
      const lastPathSegment = pathSegments[pathSegments.length - 1];

      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${lastPathSegment.length}\r\n\r\n${lastPathSegment}`;

      console.log({ path, pathSegments, lastPathSegment });
      //   const response =
      //     path === "/"
      //       ? "HTTP/1.1 200 OK\r\n\r\n"
      //       : "HTTP/1.1 404 Not Found\r\n\r\n";
      socket.write(response);
      socket.end(); // sends FIN packet
    }
    accumulatedData = [];
  });
});

tcpServer.listen(4221, "localhost", () => {
  console.log("TCP server is listening on port 4221");
});
