"use server";

const API_URL = process.env.API_URL;

export type IDish = {
  id?: string;
  dish_name: string;
  dish_type: boolean;
  supplier: boolean;
};

export async function addDish(body: IDish) {
  const res = await fetch(`${API_URL}/dish/`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return await res.json();
}

export async function addDishPrice(body: { dish_id: string; is_active: boolean; price: number }) {
  const res = await fetch(`${API_URL}/dish/`, {
    method: "POST",
    body: JSON.stringify({ ...body, id: null }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return await res.json();
}
