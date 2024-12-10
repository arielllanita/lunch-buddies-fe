"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { sentenceCase } from "change-case";
import { Plus } from "lucide-react";
import React from "react";

type MenuToday = Prisma.MenuGetPayload<{ include: { dish: { include: { supplier: true } } } }>;

export default function DishContainer({ menu: { dish, quantity } }: { menu: MenuToday }) {
  // TODO: ADJUST THIS IF USER HAS ALREADY ORDERED
  const isFreeFirstOrder =
    (dish.supplier.isFreeMainDish && dish.type == "MAIN") ||
    (dish.supplier.isFreeSideDish && dish.type == "SIDE");

  // const isOutOfStock = dish.type == "MAIN";
  const isOutOfStock = false;

  return (
    <div
      className={cn(
        "rounded border overflow-hidden",
        isOutOfStock && "grayscale cursor-not-allowed"
      )}
    >
      <div
        style={{ "--image-url": `url(${dish.imgUrl})` } as React.CSSProperties}
        className={
          "group relative flex items-center justify-center h-[20rem] bg-cover bg-bottom bg-no-repeat bg-[image:var(--image-url)]"
        }
      >
        <div className="absolute left-3 top-3 flex flex-col space-y-2">
          {dish.tags.split(",").map((tag) => (
            <p
              key={tag}
              className="bg-primary text-primary-foreground px-3 py-2 rounded-xl opacity-75 w-fit"
            >
              {tag}
            </p>
          ))}
        </div>

        {isOutOfStock ? <SoldOutBanner /> : <AddToCartBtn />}
      </div>

      <div className="bg-black p-3">
        <h2 className="text-white font-bold text-lg">{dish.name}</h2>

        <div className="flex items-center justify-between gap-1 mt-3">
          <p className="text-primary font-bold text-base lg:text-lg">
            &#8369;{dish.price.toFixed(2)}
          </p>

          {isFreeFirstOrder && (
            <p className="text-orange-500 italic font-bold text-base lg:text-lg">
              FREE for first order
            </p>
          )}

          <div className="flex items-center gap-1 text-white">
            <MenuCakeSvg />
            <span className="text-sm">{sentenceCase(dish.type)} Dish</span>
          </div>
        </div>

        <Progress value={quantity * quantity} className="h-2 w-[70%] mt-2 mb-1" />

        <div className="flex items-center justify-between">
          <p className="text-white text-xs">{quantity} meal/s left</p>

          <p className="self-end text-primary text-xs">Supplier: {dish.supplier.name}</p>
        </div>
      </div>
    </div>
  );
}

function AddToCartBtn({ onAddToCart = () => {} }) {
  return (
    // <div className="w-fit hidden group-hover:block transition ease-in-out duration-1000">
    <div className="w-fit opacity-0 invisible transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:visible">
      <Button size={"icon"} className="rounded-full" onClick={onAddToCart}>
        <Plus />
      </Button>
    </div>
  );
}

function SoldOutBanner() {
  return (
    <div className="rounded-full py-16 px-3 bg-primary text-center">
      <h1 className="text-3xl font-bold text-white">SOLD OUT</h1>
      <p className="italic text-white">This item is out of stock</p>
    </div>
  );
}

function MenuCakeSvg() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 3C6.82843 3 7.5 2.32843 7.5 1.5C7.5 0.671573 6.82843 0 6 0C5.17157 0 4.5 0.671573 4.5 1.5C4.5 2.32843 5.17157 3 6 3Z"
        fill="white"
      />
      <path
        d="M0.75 4.5C0.335786 4.5 0 4.83579 0 5.25C0 5.66421 0.335786 6 0.75 6H11.25C11.6642 6 12 5.66421 12 5.25C12 4.83579 11.6642 4.5 11.25 4.5H0.75Z"
        fill="white"
      />
      <path
        d="M0 8.25C0 7.83579 0.335786 7.5 0.75 7.5H11.25C11.6642 7.5 12 7.83579 12 8.25C12 8.66421 11.6642 9 11.25 9H0.75C0.335786 9 0 8.66421 0 8.25Z"
        fill="white"
      />
      <path
        d="M0.75 10.5C0.335786 10.5 0 10.8358 0 11.25C0 11.6642 0.335786 12 0.75 12H11.25C11.6642 12 12 11.6642 12 11.25C12 10.8358 11.6642 10.5 11.25 10.5H0.75Z"
        fill="white"
      />
    </svg>
  );
}
