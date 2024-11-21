"use server";

import { auth_options } from "@/lib/auth_options";
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

export async function getUserSession() {
  const session = await getServerSession(auth_options);
  return session;
}
