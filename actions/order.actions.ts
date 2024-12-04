// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

type OrderCreate = Prisma.Args<typeof prisma.order, "create">["data"];

export async function createSupplier(payload: OrderCreate) {
  const order = await prisma.order.create({ data: payload });
  return order;
}
