// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

type SupplierCreate = Prisma.Args<typeof prisma.supplier, "create">["data"];

export async function createSupplier(payload: SupplierCreate) {
  const supplier = await prisma.supplier.create({ data: payload });
  return supplier;
}

export async function getSuppliers() {
  const suppliers = await prisma.supplier.findMany();
  return suppliers;
}

type SupplierUpdate = Prisma.Args<typeof prisma.supplier, "update">["data"];

export async function updateSupplier(data: SupplierUpdate, id: string) {
  const supplier = await prisma.supplier.update({ where: { id }, data });
  return supplier;
}

export async function removeSuppler(id: string) {
  const supplier = await prisma.supplier.delete({ where: { id } });
  return supplier;
}
