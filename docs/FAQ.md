1. Is the "data" Event in an RFC or Just a Node.js Implementation?

```js
socket.on("data", (data: Buffer<ArrayBufferLike>) => {
});
```

- The "data" event is a high-level abstraction provided by Node.js’s event-driven architecture, built on top of TCP.
- The "data" event is not defined in any RFC. It is specific to Node.js and how its net module handles TCP sockets.
- TCP itself (defined in RFC 793) does NOT have "events" like "data", "close", or "error". Instead, TCP is just a stream of bytes, and the OS manages incoming packets.

2. How Does Node.js Know When to Fire the "data" Event?

- Node.js internally uses the operating system’s network stack to handle TCP connections. "data" is just how Node.js exposes TCP streams in an event-driven way! 🔥

- Here’s how it works:

1️⃣ The OS receives TCP packets from the network
- When data arrives at a socket, the OS buffers it in memory(stores in RAM before it's processed).

2️⃣ The OS notifies Node.js (via the Event Loop)
- Node.js doesn't actively "wait" for data.
- Instead, it relies on the OS using epoll (Linux), kqueue (macOS/BSD), or IOCP (Windows) to notify when new data is ready.

3️⃣ Node.js Reads the Data and Emits the "data" Event
- Once the OS signals that data is available, Node.js reads the buffered data.
- It then converts it into a Buffer and emits a "data" event for the socket.
- The "data" event fires whenever any data is available in the TCP socket buffer, not when the buffer is full.

3. What Does "Buffering" Mean in the Context of TCP and Memory?
- Buffering is the act of storing data temporarily in a reserved area of RAM called a buffer, before it's processed.
- How Does It Work?

1️⃣ Incoming TCP Packets: Data sent over TCP comes in the form of packets (small chunks of data). These packets arrive at the socket on the OS level.

2️⃣ Buffering in Memory: The OS has a socket buffer (part of the system's memory (RAM)), where these packets are temporarily stored until your application is ready to process them.

3️⃣ Reading Data: When you read from the socket in your application (e.g., with Node.js or any other framework), the data is taken from this buffer.

4️⃣ The size of this buffer is typically configurable and varies by the operating system. If the buffer becomes full (due to slow reading or high network traffic), the OS may apply flow control (e.g., TCP window size) to avoid losing data.

- The buffer size on a TCP socket (such as 128KB) refers to the maximum amount of data the operating system will allow the socket to buffer before you start reading the data.

TCP socket buffer size: 
- sysctl net.inet.tcp.recvspace: The TCP receive buffer size. // 131072 bytes (128KB or 0.125MB)
- sysctl net.inet.tcp.sendspace: The TCP send buffer size. // 131072 bytes (128KB or 0.125MB)



















