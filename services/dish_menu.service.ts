"use server";

import { format } from "date-fns/format";
import { IDishType } from "./dish.service";
import { revalidateTag } from "next/cache";

const API_URL = process.env.API_URL;

export async function getDishBySupplier(
  supplierId: string,
  date: string = format(Date(), "yyyy-MM-dd")
): Promise<IDishType[]> {
  const res = await fetch(`${API_URL}/dish_menu/set/supplier/${supplierId}/${date}`, {
    method: "GET",
    next: { revalidate: 600, tags: ["dish"] },
  });

  return await res.json();
}

export async function getPantry(date: Date = new Date()) {
  const dateFormat = format(date, "yyyy-MM-dd");

  const res = await fetch(`${API_URL}/dish_menu/dish_price_id/${dateFormat}`, {
    method: "GET",
    next: { revalidate: 600, tags: ["dish", "menu"] },
  });

  return await res.json();
}

export async function createDishMenu(body: {
  items: { dish_availability: number; dish_price_id: string }[];
  menu_id: string;
}) {
  const res = await fetch(`${API_URL}/dish_menu/`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  revalidateTag("menu");

  return res.status;
}
