"use server";

import { format } from "date-fns/format";
import { IDishType } from "./dish.service";
import { revalidateTag } from "next/cache";

const API_URL = process.env.API_URL;

export async function getMenuByDate(date: Date = new Date()): Promise<[]> {
  const dateFormat = format(date, "yyyy-MM-dd");

  const res = await fetch(`${API_URL}/menu/search/${dateFormat}/`, {
    method: "GET",
    next: { revalidate: 600, tags: ["menu"] },
  });

  return await res.json();
}

export async function createMenu(date: Date = new Date()) {
  const dateFormat = format(date, "yyyy-MM-dd");

  const res = await fetch(`${API_URL}/menu/`, {
    method: "POST",
    body: JSON.stringify({ date: dateFormat, id: null }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  revalidateTag("menu");

  return await res.json();
}

export async function deleteMenuByDate(date: Date = new Date()) {
  const dateFormat = format(date, "yyyy-MM-dd");

  const res = await fetch(`${API_URL}/menu/${dateFormat}/`, {
    method: "DELETE",
    cache: "no-store",
  });

  revalidateTag("menu");

  return res.status;
}
