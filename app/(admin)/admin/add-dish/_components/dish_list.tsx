"use client";

import ClientPagination from "@/components/client_pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaginator } from "@/hooks/use-paginator";
import { IDishType, deleteDish, editDishPrice, getDishPriceById } from "@/services/dish.service";
import { Save, SquarePen, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export interface DishList {
  id: string;
  price: number;
  is_active: boolean;
  dish_id: DishID;
  dish_name: null;
  date: Date;
}

export interface DishID {
  id: string;
  dish_name: string;
  dish_type: string;
  img_url: string;
  supplier: Supplier;
  created_at: Date;
}

export interface Supplier {
  supplier_name: string;
  main_dish_free: boolean;
  side_dish_free: boolean;
  id: string;
}

export default function DishList({ dishes }: { dishes: IDishType[] }) {
  const itemsPerPage = 10;
  const clientPaginator = usePaginator(dishes, itemsPerPage);

  return (
    <Card>
      <CardContent className="p-4">
        <h1 className="text-3xl mb-4">Food Suppliers</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dish Name</TableHead>
              <TableHead>Dish Type</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date added</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientPaginator.itemsOnPage.map((dish) => (
              <CustomRow key={dish.id} dish={dish} />
            ))}
          </TableBody>
        </Table>

        <ClientPagination
          {...clientPaginator}
          arrayLength={dishes.length}
          itemsPerPage={itemsPerPage}
        />
      </CardContent>
    </Card>
  );
}

function CustomRow({ dish }: { dish: IDishType }) {
  const [rowState, setRowState] = useState<{ isEditing: boolean }>();

  if (rowState?.isEditing) {
    return <EditingRow rowData={dish} cancelEditing={() => setRowState({ isEditing: false })} />;
  }

  return (
    <TableRow>
      <TableCell>{dish.dish_id.dish_name}</TableCell>
      <TableCell>{dish.dish_id.dish_type}</TableCell>
      <TableCell>{dish.dish_id.supplier.supplier_name}</TableCell>
      <TableCell>&#x20B1;{dish.price.toFixed(2)}</TableCell>
      <TableCell>{dish.dish_id.created_at.split("T")[0]}</TableCell>
      <TableCell>
        <div className="flex justify-end gap-3">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setRowState({ isEditing: true })}
          >
            <SquarePen />
          </Button>

          <DeleteDishBtn dish={dish} />
        </div>
      </TableCell>
    </TableRow>
  );
}

function EditingRow({ rowData, cancelEditing }: { rowData: IDishType; cancelEditing: () => void }) {
  const router = useRouter();

  const [updatedData, setUpdatedData] = useState({
    dish_name: rowData.dish_id.dish_name,
    price: rowData.price,
  });

  const changeHandler = (key: "dish_name" | "price", value: string) => {
    setUpdatedData({ ...updatedData, [key]: value });
  };

  const saveHandler = async () => {
    const payload = JSON.stringify({
      id: null,
      is_active: true,
      dish_id: rowData.dish_id.id,
      ...updatedData,
    });

    const code = await editDishPrice(rowData.id, payload);
    if (code !== 200) {
      toast.error(`Failed to update ${rowData.dish_id.dish_name}`);
      return;
    }

    toast.success(`${rowData.dish_id.dish_name} has been updated successfully!`);
    cancelEditing();
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          type="text"
          value={updatedData.dish_name}
          onChange={(e) => changeHandler("dish_name", e.target.value)}
          required
        />
      </TableCell>
      <TableCell>{rowData.dish_id.dish_type}</TableCell>
      <TableCell>{rowData.dish_id.supplier.supplier_name}</TableCell>
      <TableCell>
        <Input
          type="number"
          value={updatedData.price}
          onChange={(e) => changeHandler("price", e.target.value)}
          required
        />
      </TableCell>
      <TableCell>{rowData.dish_id.created_at.split("T")[0]}</TableCell>

      <TableCell>
        <div className="flex justify-end gap-3">
          <Button variant={"outline"} size={"icon"} onClick={saveHandler}>
            <Save className="text-primary" />
          </Button>

          <Button variant={"outline"} size={"icon"} onClick={cancelEditing}>
            <X />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function DeleteDishBtn({ dish }: { dish: IDishType }) {
  const router = useRouter();

  const removeHandler = async () => {
    const res = await getDishPriceById(dish.id);
    if (!res?.dish_id?.id) {
      toast.error("Failed to delete resource1");
      return;
    }

    const statusCode = await deleteDish(res.dish_id.id);
    if (statusCode !== 204) {
      toast.error("Failed to delete resource");
      return;
    }

    toast.success(`${dish.dish_id.dish_name} has been deleted`);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Trash className="text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure want to delete {dish.dish_id.dish_name}?</DialogTitle>
          <DialogDescription>
            This dish will be deleted immediately. You can&apos;t undo this action.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={removeHandler}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
