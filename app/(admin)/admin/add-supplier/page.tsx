import { getSuppliers } from "@/actions/supplier.action";
import AddSupplier from "./_components/add_supplier";
import dynamic from "next/dynamic";
// import ListSupplier from "./_components/list_supplier";

const ListSupplier = dynamic(() => import("./_components/list_supplier"), {
  ssr: false,
});

export default async function Page() {
  // TODO: ADD PAGINATION
  const suppliers = await getSuppliers();

  return (
    <div className="flex flex-col gap-6 p-7">
      <AddSupplier />
      <ListSupplier suppliers={suppliers} />
    </div>
  );
}
