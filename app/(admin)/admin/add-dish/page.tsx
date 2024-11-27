import { getSupplier } from "@/services/supplier.service";
import AddDish from "./_components/add_dish";
import DishList from "./_components/dish_list";
import { getDishPrice } from "@/services/dish.service";

export default async function Page() {
  const suppliers = await getSupplier(60);
  const dishes = await getDishPrice();

  return (
    <div className="flex flex-col gap-6 p-7">
      <AddDish suppliers={suppliers} />
      <DishList dishes={dishes} />
    </div>
  );
}
