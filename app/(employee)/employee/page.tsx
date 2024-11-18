import { auth_options } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Employee() {
  const session = await getServerSession(auth_options);

  return (
    <main>
      <div className="px-28 py-10">
        <h1 className="text-4xl">Good morning, {session?.user.first_name}!</h1>
        <p className="text-lg">What&apos;s your food mood today?</p>
      </div>
    </main>
  );
}
