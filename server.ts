import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const hostname = process.env.HOSTNAME || "localhost";
const port = (process.env.PORT || 3000) as number;
const dev = process.env.NODE_ENV !== "production";

// When using middleware `hostname` and `port` must be provided below
const app = next({ dev, port, hostname });
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
