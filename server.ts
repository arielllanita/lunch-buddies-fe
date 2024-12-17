import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const hostname = "localhost";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("fetch_menu_today", (menus) => {
      io.emit("receive_menu_today", menus);
    });
  });

  httpServer
    .once("error", async (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => console.log(`🚀 Ready on http://${hostname}:${port}`));
});
