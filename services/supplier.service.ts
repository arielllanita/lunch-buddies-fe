"use server";

import { revalidateTag } from "next/cache";

const API_URL = process.env.API_URL;

export type ISupplier = {
  id?: string;
  supplier_name: string;
  main_dish_free: boolean;
  side_dish_free: boolean;
};

export async function getSupplier(): Promise<ISupplier[]> {
  const res = await fetch(`${API_URL}/supplier/`, {
    method: "GET",
    next: { revalidate: 600, tags: ["supplier"] },
  });

  return await res.json();
}

export async function addSupplier(body: ISupplier) {
  const res = await fetch(`${API_URL}/supplier/`, {
    method: "POST",
    body: JSON.stringify({ ...body, id: null }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  revalidateTag("supplier");

  return await res.json();
}

export async function editSupplier(body: ISupplier) {
  const res = await fetch(`${API_URL}/supplier/${body.id}`, {
    method: "PUT",
    body: JSON.stringify({ ...body, id: null }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  revalidateTag("supplier");

  return res.status;
}

export async function removeSupplier(id: string) {
  const res = await fetch(`${API_URL}/supplier/${id}/`, {
    method: "DELETE",
    cache: "no-store",
  });

  revalidateTag("supplier");

  return res.status;
}
