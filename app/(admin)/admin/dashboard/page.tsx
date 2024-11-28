"use client";

import { useRef } from "react";
import Pantry, { PantryRef } from "./_components/pantry";
import Suppliers from "./_components/suppliers";
import { IDishType } from "@/services/dish.service";

export default function Page() {
  const pantryRef = useRef<PantryRef>(null);

  const addDish = (dish: IDishType) => {
    pantryRef.current?.addDish(dish);
  };

  return (
    <div className="flex flex-col gap-6 p-7">
      <h1 className="text-4xl">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <Suppliers addDish={addDish} />
        <Pantry ref={pantryRef} />
      </div>
    </div>
  );
}
