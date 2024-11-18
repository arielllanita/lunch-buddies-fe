import { getSupplier } from "@/services/supplier.service";
import AddSupplier from "./_components/add_supplier";
import ListSupplier from "./_components/list_supplier";

export default async function Page() {
  const suppliers = await getSupplier();
  
  return (
    <div className="flex flex-col gap-6 p-7">
      <AddSupplier />
      <ListSupplier suppliers={suppliers} />
    </div>
  );
}
