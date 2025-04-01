import net from "net";

// The server can be a TCP server or an IPC server, depending on what it listen() to
const tcpServer = net.createServer((socket: net.Socket) => {
  socket.on("close", () => {
    socket.end();
  });
});

tcpServer.listen(4221, "localhost");
