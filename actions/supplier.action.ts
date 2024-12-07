// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export async function getSuppliers(options?: Prisma.SupplierWhereInput) {
  const suppliers = await prisma.supplier.findMany({ where: options });
  return suppliers;
}

type SupplierCreate = Prisma.Args<typeof prisma.supplier, "create">["data"];

export async function createSupplier(payload: SupplierCreate) {
  const supplier = await prisma.supplier.create({ data: payload });
  return supplier;
}

type SupplierUpdate = Prisma.Args<typeof prisma.supplier, "update">["data"];

export async function updateSupplier(data: SupplierUpdate, id: string) {
  const supplier = await prisma.supplier.update({ where: { id }, data });
  return supplier;
}

export async function removeSupplier(id: string) {
  const supplier = await prisma.supplier.delete({ where: { id } });
  return supplier;
}
