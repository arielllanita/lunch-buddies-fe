"use server";

const API_URL = process.env.API_URL;

export type ISupplier = {
  id?: string;
  supplier_name: string;
  main_dish_free: boolean;
  side_dish_free: boolean;
};

export async function getSupplier(revalidate?: number): Promise<ISupplier[]> {
  const res = await fetch(`${API_URL}/supplier/`, {
    method: "GET",
    next: { revalidate: revalidate ?? 0 },
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
  return await res.json();
}

export async function editSupplier(body: ISupplier) {
  const res = await fetch(`${API_URL}/supplier/${body.id}`, {
    method: "PUT",
    body: JSON.stringify({ ...body, id: null }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return res.status;
}

export async function removeSupplier(id: string) {
  const res = await fetch(`${API_URL}/supplier/${id}/`, {
    method: "DELETE",
    cache: "no-store",
  });
  return res.status;
}
