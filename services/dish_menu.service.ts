"use server";

import { format } from "date-fns/format";
import { IDishType } from "./dish.service";

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
