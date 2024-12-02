"use server";

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
