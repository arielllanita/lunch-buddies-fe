// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export async function getDish(options?: Prisma.DishWhereInput) {
  const dishes = await prisma.dish.findMany({ where: options });
  return dishes;
}
