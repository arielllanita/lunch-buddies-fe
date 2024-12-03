import { auth_options } from "@/lib/auth_options";
import { getDish } from "@/services/dish_menu.service";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Employee() {
  const session = await getServerSession(auth_options);

  const mainDish = await getDish(undefined, "main_dish");
  const sideDish = await getDish(undefined, "side_dish");
  const extraDish = await getDish(undefined, "extra");

  return (
    <main className="px-28 py-10">
      <div className="mb-14">
        <h1 className="text-4xl">Good morning, {session?.user.first_name}!</h1>
        <p className="text-lg">What&apos;s your food mood today?</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold">Main Dish</h2>
          <pre> {JSON.stringify(mainDish, null, 2)} </pre>
        </div>

        <div>
          <h2 className="text-3xl font-bold">Side Dish</h2>
          <pre> {JSON.stringify(sideDish, null, 2)} </pre>
        </div>

        <div>
          <h2 className="text-3xl font-bold">Extra Dish</h2>
          <pre> {JSON.stringify(extraDish, null, 2)} </pre>
        </div>
      </div>
    </main>
  );
}
