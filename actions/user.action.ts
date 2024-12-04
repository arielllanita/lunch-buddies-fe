// See prisma generated types https://www.prisma.io/docs/orm/prisma-client/type-safety

"use server";

import prisma from "@/prisma/client";
import { Prisma, type User } from "@prisma/client";
import bcrypt from "bcrypt";

type UserCreate = Prisma.Args<typeof prisma.user, "create">["data"];

export async function createUser(payload: UserCreate): Promise<User> {
  const hashedPw = await bcrypt.hash(payload.password, 10);
  const data = { ...payload, password: hashedPw };

  const user = await prisma.user.create({ data });

  return user;
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  return isCorrectPassword ? user : null;
}

export async function removeUser(id: string) {
  const user = await prisma.user.delete({ where: { id } });
  return user;
}

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}
