"use server";

import { auth_options } from "@/lib/auth_options";
import { format } from "date-fns/format";
import { getServerSession } from "next-auth";

const API_URL = process.env.API_URL;

export async function userLogin(body: string) {
  const res = await fetch(`${API_URL}/login/user`, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return await res.json();
}

export async function getUserOrder(date: Date = new Date()) {
  const session = await getServerSession(auth_options);
  const userId = session?.user.id;

  const formattedDate = format(date, "yyyy-MM-dd");

  const res = await fetch(`${API_URL}/ordered_dish/${userId}/${formattedDate}/user_order/`, {
    method: "GET",
    next: { revalidate: 600, tags: ["order"] },
  });

  return await res.json();
}
