// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";

export async function getMenus(options?: Prisma.MenuWhereInput) {
  const menus = await prisma.menu.findMany({ where: options, include: { dish: true } });
  return menus;
}

export async function createMenu(data: Prisma.MenuCreateManyInput[]) {
  const menu = await prisma.menu.createMany({ data });
  return menu;
}

export async function removeMenuByDate(date: Date) {
  const menus = prisma.menu.deleteMany({
    where: { date: { gte: startOfDay(date), lte: endOfDay(date) } },
  });
  return menus;
}
