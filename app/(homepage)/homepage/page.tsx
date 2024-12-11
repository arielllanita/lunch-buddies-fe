import { auth_options } from "@/lib/auth_options";
import prisma from "@/prisma/client";
import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";
import { getServerSession } from "next-auth";
import DishContainer from "./_components/dish_container";
import { HomepageProvider } from "./_context/homepage.context";

export default async function Employee() {
  const session = await getServerSession(auth_options);
  const dateToday = new Date();

  const menu = await prisma.menu.findMany({
    where: { date: { gte: startOfDay(dateToday), lte: endOfDay(dateToday) } },
    include: { dish: { include: { supplier: true } } },
  });

  const mainDish = menu.filter((x) => x.dish.type == "MAIN");
  const sideDish = menu.filter((x) => x.dish.type == "SIDE");
  const extraDish = menu.filter((x) => x.dish.type == "EXTRA");

  return (
    <HomepageProvider>
      <div className="px-16 py-10">
        <h1 className="text-4xl">Good morning, {session?.user.first_name}!</h1>
        <p className="text-lg">What&apos;s your food mood today?</p>
      </div>

      {mainDish.length > 0 && (
        <div className="px-16 py-5">
          <h2 className="text-3xl font-bold">Main Dish</h2>
          <p className="text-primary mb-5">with Rice</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {mainDish.map((menu, i) => (
              <DishContainer key={i} menu={menu} />
            ))}
          </div>
        </div>
      )}

      {sideDish.length > 0 && (
        <div className="px-16 py-5 bg-slate-50">
          <h2 className="text-3xl font-bold">Side Dish</h2>
          <p className="text-primary mb-5">{sideDish.length} meal/s listed</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {sideDish.map((menu, i) => (
              <DishContainer key={i} menu={menu} />
            ))}
          </div>
        </div>
      )}

      {extraDish.length > 0 && (
        <div className="px-16 pt-5 pb-14">
          <h2 className="text-3xl font-bold">Extra Dish</h2>
          <p className="text-primary mb-5">{extraDish.length} meal/s listed</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {extraDish.map((menu, i) => (
              <DishContainer key={i} menu={menu} />
            ))}
          </div>
        </div>
      )}
    </HomepageProvider>
  );
}
