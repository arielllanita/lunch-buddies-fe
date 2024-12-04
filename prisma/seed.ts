// See database seeding https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import { type DishType, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Seeding command
// npx prisma db seed

async function seed() {
  // ADD USER
  await prisma.user.upsert({
    where: { email: "user@test.com" },
    create: {
      email: "user@test.com",
      password: "$2b$10$BiSIOgndKrrL46etGqB.WedZJcd1j4JVNheTofbzgF35z157DdVYG", // password
      firstName: "John",
      lastName: "Doe",
      role: "ADMIN",
    },
    update: {},
  });

  // ADD SUPPLIER
  const supplier = await prisma.supplier.upsert({
    where: { name: "TEST SUPPLIER" },
    create: {
      name: "TEST SUPPLIER",
      isFreeMainDish: true,
      isFreeSideDish: false,
    },
    update: {},
  });

  // ADD DISHES
  const dishTypes = ["MAIN", "SIDE", "EXTRA"];
  for (let i = 0; i < dishTypes.length; i++) {
    const e = dishTypes[i];
    await prisma.dish.create({
      data: {
        name: `TEST ${e} DISH`,
        price: 65,
        tags: "Spicy,Halal",
        type: e as DishType,
        supplierId: supplier.id,
      },
    });
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
