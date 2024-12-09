import { getMenus } from "@/actions/menu.actions";
import { auth_options } from "@/lib/auth_options";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";
import { getServerSession } from "next-auth";
import DishContainer from "./_components/dish_container";

export type MenuToday = Prisma.MenuGetPayload<{ include: { dish: true } }>;

export default async function Employee() {
  const session = await getServerSession(auth_options);

  const dateToday = new Date();

  const menu: MenuToday[] = await prisma.menu.findMany({
    where: { date: { gte: startOfDay(dateToday), lte: endOfDay(dateToday) } },
    include: { dish: true },
  });

  return (
    <main className="px-28 py-10">
      <div className="mb-14">
        <h1 className="text-4xl">Good morning, {session?.user.first_name}!</h1>
        <p className="text-lg">What&apos;s your food mood today?</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold">Main Dish</h2>
          <p className="text-primary">with Rice</p>

          {menu
            .filter((x) => x.dish.type == "MAIN")
            .map((menu) => (
              <DishContainer key={menu.id} menu={menu} />
            ))}
        </div>

        <div>
          <h2 className="text-3xl font-bold">Side Dish</h2>
        </div>

        <div>
          <h2 className="text-3xl font-bold">Extra Dish</h2>
        </div>
      </div>
    </main>
  );
}
