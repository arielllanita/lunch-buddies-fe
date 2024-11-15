import { auth_options } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Employee() {
  const session = await getServerSession(auth_options);

  console.log("employee user", session);

  return (
    <div>
      {/* Employee Page <Link href={"/api/auth/signout?callbackUrl=/"}>Signout</Link>{" "} */}
      <h1 className="text-5xl">hello world xxx</h1>
    </div>
  );
}
