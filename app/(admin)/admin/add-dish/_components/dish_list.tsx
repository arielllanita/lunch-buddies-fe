"use client";

import { DishWIthSupplier, updateDish, deleteDish } from "@/actions/dish.actions";
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
import { capitalCase } from "change-case";
import { format } from "date-fns/format";
import { Save, SquarePen, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DishList({ dishes }: { dishes: DishWIthSupplier[] }) {
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
              <Row key={dish.id} dish={dish} />
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

function Row({ dish }: { dish: DishWIthSupplier }) {
  const [isEditMode, setIsEditMode] = useState(false);

  if (isEditMode) {
    return <EditingRow dish={dish} cancelEditing={() => setIsEditMode(false)} />;
  }

  return (
    <TableRow>
      <TableCell>{dish.name}</TableCell>
      <TableCell>{capitalCase(`${dish.type} Dish`)}</TableCell>
      <TableCell>{dish.supplier.name}</TableCell>
      <TableCell>&#x20B1;{dish.price.toFixed(2)}</TableCell>
      <TableCell>{format(dish.createdAt, "yyyy-MM-dd")}</TableCell>
      <TableCell>
        <div className="flex justify-end gap-4">
          <Button variant={"outline"} size={"icon"} onClick={() => setIsEditMode(true)}>
            <SquarePen />
          </Button>

          <DeleteDishBtn dish={dish} />
        </div>
      </TableCell>
    </TableRow>
  );
}

function EditingRow({
  dish,
  cancelEditing,
}: {
  dish: DishWIthSupplier;
  cancelEditing: () => void;
}) {
  const router = useRouter();

  const [dishUpdateData, setDishUpdateData] = useState({
    name: dish.name,
    price: dish.price,
  });

  const changeHandler = (key: "name" | "price", value: string) => {
    setDishUpdateData((x) => ({ ...x, [key]: value }));
  };

  const saveHandler = async () => {
    await updateDish(dish.id, { name: dishUpdateData.name, price: Number(dishUpdateData.price) });

    toast.success(`${dish.name} has been updated successfully!`);
    cancelEditing();
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          type="text"
          value={dishUpdateData.name}
          onChange={(e) => changeHandler("name", e.target.value)}
          required
        />
      </TableCell>
      <TableCell>{capitalCase(`${dish.type} Dish`)}</TableCell>
      <TableCell>{dish.supplier.name}</TableCell>
      <TableCell>
        <Input
          type="number"
          value={dishUpdateData.price}
          step={'0.01'}
          onChange={(e) => changeHandler("price", e.target.value)}
          required
        />
      </TableCell>
      <TableCell>{format(dish.createdAt, "yyyy-MM-dd")}</TableCell>

      <TableCell>
        <div className="flex justify-end gap-4">
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

function DeleteDishBtn({ dish }: { dish: DishWIthSupplier }) {
  const router = useRouter();

  const removeHandler = async () => {
    await deleteDish(dish.id);

    toast.success(`${dish.name} has been deleted`);
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
          <DialogTitle>Are you sure want to delete {dish.name}?</DialogTitle>
          <DialogDescription>
            <span>
              This dish and all of its menus will be deleted immediately. You can&apos;t undo this
              action.
            </span>
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
