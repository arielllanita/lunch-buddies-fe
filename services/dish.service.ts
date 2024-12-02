"use server";

import { revalidateTag } from "next/cache";

const API_URL = process.env.API_URL;

export type IDish = {
  id?: string;
  dish_name: string;
  dish_type: string;
  supplier: string;
  img_url: File | string;
  tags: string;
};

export type IDishType = {
  id: string;
  price: number;
  is_active: boolean;
  dish_id: {
    id: string;
    dish_name: string;
    dish_type: string;
    img_url: string;
    supplier: {
      supplier_name: string;
      main_dish_free: boolean;
      side_dish_free: boolean;
      id: string;
    };
    created_at: string;
  };
  dish_name: null;
  date: string;
};

export async function addDish(body: FormData) {
  const res = await fetch(`${API_URL}/dish/`, {
    next: { tags: ["dish"] },
    method: "POST",
    cache: "no-store",
    body: body,
  });

  revalidateTag("dish");

  return await res.json();
}

export async function addDishPrice(body: { dish_id: string; price: number }) {
  const res = await fetch(`${API_URL}/dish_price/`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ ...body, id: null, is_active: true }),
    headers: { "Content-Type": "application/json" },
  });

  return res.status;
}

export async function getDishPrice(): Promise<IDishType[]> {
  const res = await fetch(`${API_URL}/dish_price/`, {
    next: { tags: ["dish"], revalidate: 600 },
    method: "GET",
  });

  return await res.json();
}

export async function editDishPrice(id: string, body: string) {
  const res = await fetch(`${API_URL}/dish_price/${id}`, {
    method: "PUT",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body,
  });

  return res.status;
}

export async function getDishPriceById(dishId: string) {
  const res = await fetch(`${API_URL}/dish_price/${dishId}/`, {
    next: { tags: ["dish"], revalidate: 600 },
    method: "GET",
  });

  return await res.json();
}

export async function deleteDish(dishId: string) {
  const res = await fetch(`${API_URL}/dish/${dishId}/`, {
    method: "DELETE",
    cache: "no-store",
  });

  return res.status;
}
