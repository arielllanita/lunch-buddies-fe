import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";
import { Order, Prisma, PrismaClient } from "@prisma/client";
import { startOfDay } from "date-fns/startOfDay";
import { endOfDay } from "date-fns/endOfDay";

const hostname = "localhost";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handler = app.getRequestHandler();

const prisma = new PrismaClient();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`Client socket connectedx: ${socket.id}`);

    socket.on("fetch_menu_today", async () => {
      const menus = await getMenuToday();
      socket.emit("receive_menu_today", menus);
    });

    socket.on("submit_order", async (orders: Prisma.OrderCreateManyInput[]) => {
      console.log("orders", orders);
      await createOrder(orders);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => console.log(`🚀 Ready on http://${hostname}:${port}`));
});

async function getMenuToday() {
  const today = new Date();
  const menus = await prisma.menu.findMany({
    where: { date: { gte: startOfDay(today), lte: endOfDay(today) } },
    include: { _count: { select: { order: true } }, dish: { include: { supplier: true } } },
  });

  return menus;
}

async function createOrder(payload: Prisma.OrderCreateManyInput[]) {
  const order = await prisma.order.createMany({ data: payload });
}
