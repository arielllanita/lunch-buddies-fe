// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import { auth_options } from "@/lib/auth_options";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";
import { $Enums } from "@prisma/client";

export async function getOrders() {
  const session = await getServerSession(auth_options);
  const userId = session!.user.id as string;

  const today = new Date();

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: startOfDay(today), lte: endOfDay(today) }, userId },
    include: { menu: { include: { dish: true } } },
  });

  return orders;
}

type CreateOrder = { menuId: string; orderQuantity: number; note: string }[];

export async function createOrder(
  data: CreateOrder
): Promise<{ status: "error" | "success"; msg: string }> {
  const session = await getServerSession(auth_options);
  const userId = session!.user.id as string;

  const isUserHasOrders = await checkUserOrder(userId);

  if (isUserHasOrders) {
    return { status: "error", msg: "You have already submitted your order" };
  }

  await createOrders(data, userId);

  return { status: "success", msg: "Order successfully added" };
}

async function createOrders(payload: CreateOrder, userId: string) {
  // Initialize an object to track if the user has already ordered a MAIN or SIDE dish.
  const userOrderTracker = {
    MAIN: false,
    SIDE: false,
  };

  // Step 1: Get all related menu items and their dish details
  const menuIds = payload.map((order) => order.menuId);
  const menusFromDb = await prisma.menu.findMany({
    where: {
      id: { in: menuIds },
    },
    select: {
      id: true,
      dish: {
        select: {
          type: true,
          price: true,
          supplier: { select: { isFreeMainDish: true, isFreeSideDish: true } },
        },
      },
    },
  });

  // Step 2: Map menuId to dishPrice for easier lookup
  const menuDetailsMap = menusFromDb.reduce((acc, menu) => {
    acc[menu.id] = menu.dish;
    return acc;
  }, {} as Record<string, { type: $Enums.DishType; price: number; supplier: { isFreeMainDish: boolean; isFreeSideDish: boolean } }>);

  // Step 3: Prepare the data with calculated `dishPrice`, `total` and `discount`
  const ordersData = payload.map((order) => {
    const menuMap = menuDetailsMap[order.menuId];

    const dishPrice = menuMap.price;
    const dishType = menuMap.type;

    let discount = 0;

    // Check if it's the first order for this dish type (MAIN or SIDE)
    if (dishType === "MAIN" && !userOrderTracker.MAIN) {
      discount = menuMap.supplier.isFreeMainDish ? dishPrice : 0;
      userOrderTracker.MAIN = true; // Mark as ordered
    } else if (dishType === "SIDE" && !userOrderTracker.SIDE) {
      discount = menuMap.supplier.isFreeSideDish ? dishPrice : 0;
      userOrderTracker.SIDE = true; // Mark as ordered
    }

    const total = dishPrice * order.orderQuantity - discount;

    return {
      menuId: order.menuId,
      quantity: order.orderQuantity,
      note: order.note,
      dishPrice,
      discount,
      total,
      userId,
    };
  });

  // Step 4: Insert the orders into the database
  const orders = await prisma.order.createMany({
    data: ordersData,
  });

  return orders;
}

async function checkUserOrder(userId: string) {
  const today = new Date();
  const orders = await prisma.order.count({
    where: { createdAt: { gte: startOfDay(today), lte: endOfDay(today) }, userId },
  });

  return orders > 0;
}

async function checkDishAvailability(payload: CreateOrder) {}
