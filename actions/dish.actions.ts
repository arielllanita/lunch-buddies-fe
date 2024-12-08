// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function getDish(
  where?: Prisma.DishWhereInput,
  include?: Prisma.DishInclude<DefaultArgs>
) {
  const dishes = await prisma.dish.findMany({ where, include });
  return dishes;
}
