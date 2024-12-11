// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export async function createOrder(payload: Prisma.OrderCreateManyInput[]) {
  const order = await prisma.order.createMany({ data: payload });
  return order;
}
