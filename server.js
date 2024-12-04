const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const hostname = "localhost";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`Client socket connected: ${socket.id}`);

    socket.on("send_chat", (msg) => {
      io.emit("store_chat", msg);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => console.log(`🚀 Ready on http://${hostname}:${port}`));
});
