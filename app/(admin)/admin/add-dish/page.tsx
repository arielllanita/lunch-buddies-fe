import { getDish } from "@/actions/dish.actions";
import { getSuppliers } from "@/actions/supplier.action";
import AddDish from "./_components/add_dish";
import DishList from "./_components/dish_list";

export default async function Page() {
  const suppliers = await getSuppliers();
  const dishes = await getDish(undefined, { supplier: true });

  console.log(dishes);

  return (
    <div className="flex flex-col gap-6 p-7">
      {/* <AddDish suppliers={suppliers} /> */}
      <DishList dishes={dishes} />
    </div>
  );
}
