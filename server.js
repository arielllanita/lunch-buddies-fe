const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const hostname = "localhost";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handler = app.getRequestHandler();

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  const msgs = [];

  io.on("connection", (socket) => {
    console.log(`Client socket connected: ${socket.id}`);

    socket.on("send_msg", async (msg) => {
      // const users = await prisma.user.findMany();

      msgs.push(msg)
      io.emit("get_msgs", msgs);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => console.log(`🚀 Ready on http://${hostname}:${port}`));
});
