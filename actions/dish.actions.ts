// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import { dishImageRemove, dishImageUpload } from "@/lib/dish_image";
import prisma from "@/prisma/client";
import { DishType, Prisma } from "@prisma/client";

export async function getDish(where?: Prisma.DishWhereInput) {
  const dishes = await prisma.dish.findMany({ where });
  return dishes;
}

export type DishWIthSupplier = Prisma.DishGetPayload<{ include: { supplier: true } }>;

export async function getDishAndSupplier(
  where?: Prisma.DishWhereInput
): Promise<DishWIthSupplier[]> {
  const dishes = await prisma.dish.findMany({ where, include: { supplier: true } });
  return dishes;
}

type UpdateDish = Prisma.Args<typeof prisma.dish, "update">["data"];

export async function updateDish(id: string, data: UpdateDish) {
  const dish = await prisma.dish.update({ where: { id }, data });
  return dish;
}

export async function deleteDish(id: string) {
  const dish = await prisma.dish.delete({ where: { id } });
  await dishImageRemove(dish.imgUrl);
  return dish;
}

type DishCreate = Prisma.Args<typeof prisma.dish, "create">["data"];

export async function createDish(formData: FormData) {
  const img = formData.get("imgFile") as File;
  const name = formData.get("name") as string;
  const type = formData.get("type") as DishType;
  const supplierId = formData.get("supplierId") as string;
  const tags = formData.get("tags") as string;
  const price = Number(formData.get("price"));

  const imgUrl = await dishImageUpload(img);

  const dish = await prisma.dish.create({
    data: {
      name,
      price,
      tags,
      type,
      supplierId,
      imgUrl,
    },
  });
  return dish;
}
