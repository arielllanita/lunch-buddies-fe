import { getDishAndSupplier } from "@/actions/dish.actions";
import { getSuppliers } from "@/actions/supplier.action";
import DishList from "./_components/dish_list";
import AddDish from "./_components/add_dish";

export default async function Page() {
  const suppliers = await getSuppliers();
  const dishes = await getDishAndSupplier();

  return (
    <div className="flex flex-col gap-6 p-7">
      <AddDish suppliers={suppliers} />
      <DishList dishes={dishes} />
    </div>
  );
}
