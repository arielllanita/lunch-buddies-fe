"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { ISupplier, editSupplier, removeSupplier } from "@/services/supplier.service";
import { Check, Save, SquarePen, Trash, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { IDishType } from "@/services/dish.service";

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
//  2:20
export default function DishList({ dishes }: { dishes: IDishType[] }) {
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
            {dishes.map((dishes) => (
              <TableRow key={dishes.id}>
                <TableCell>{dishes.dish_id.dish_name}</TableCell>
                <TableCell>{dishes.dish_id.dish_type}</TableCell>
                <TableCell>{dishes.dish_id.supplier.supplier_name}</TableCell>
                <TableCell>&#x20B1;{dishes.price.toFixed(2)}</TableCell>
                <TableCell>{dishes.dish_id.created_at.split("T")[0]}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-3">
                    <Button variant={"outline"} size={"icon"} onClick={() => {}}>
                      <SquarePen />
                    </Button>

                    <Button variant={"outline"} size={"icon"} onClick={() => {}}>
                      <Trash className="text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function CustomRow({ rowData }: { rowData: ISupplier }) {
  const [table, setTable] = useState<{ isEditing: boolean; data?: ISupplier }>();

  const router = useRouter();
  const isRowEditMode = table?.isEditing && table.data?.id == rowData.id;

  const editMode = async (values: ISupplier) => {
    setTable(() => ({ data: values, isEditing: true }));
  };

  const cancelEditMode = () => {
    setTable({ data: undefined, isEditing: false });
  };

  const changeHandler = (
    key: "supplier_name" | "main_dish_free" | "side_dish_free",
    value: string | boolean
  ) => setTable((v) => ({ isEditing: true, data: { ...v!.data, [key]: value } as ISupplier }));

  const saveUpdate = async () => {
    if (!table?.data) {
      throw new Error("Invalid data");
    }

    const status = await editSupplier(table.data);

    if (status !== 200) {
      throw new Error("Server Error");
    }

    toast.success(`${table.data.supplier_name} has been updated successfully!`);
    cancelEditMode();
    router.refresh();
  };

  return (
    <TableRow>
      {isRowEditMode ? (
        <>
          <TableCell>
            <Input
              defaultValue={rowData.supplier_name}
              onChange={(v) => changeHandler("supplier_name", v.target.value)}
            />
          </TableCell>
          <TableCell>
            <Switch
              defaultChecked={rowData.main_dish_free}
              onCheckedChange={(checked) => changeHandler("main_dish_free", checked)}
            />
          </TableCell>
          <TableCell>
            <Switch
              defaultChecked={rowData.side_dish_free}
              onCheckedChange={(checked) => changeHandler("side_dish_free", checked)}
            />
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{rowData.supplier_name}</TableCell>
          <TableCell>{rowData.main_dish_free ? <Check /> : <X />}</TableCell>
          <TableCell>{rowData.side_dish_free ? <Check /> : <X />}</TableCell>
        </>
      )}
      <TableCell>
        <div className="flex gap-4">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => {
              isRowEditMode ? saveUpdate() : editMode(rowData);
            }}
          >
            {isRowEditMode ? <Save className="text-primary" /> : <SquarePen />}
          </Button>

          {isRowEditMode ? (
            <Button variant={"outline"} size={"icon"} onClick={cancelEditMode}>
              <X />
            </Button>
          ) : (
            <DeleteSupplierBtn supplier={rowData} />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

function DeleteSupplierBtn({ supplier }: { supplier: ISupplier }) {
  const router = useRouter();

  const removeHandler = async () => {
    const statusCode = await removeSupplier(supplier.id!);

    // Request has been successfully completed
    if (statusCode !== 204) {
      throw new Error("Failed to delete resource");
    }

    toast.success(`${supplier.supplier_name} has been deleted`);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Trash className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure want to delete {supplier.supplier_name}?</DialogTitle>
          <DialogDescription>
            This supplier will be deleted immediately. You can&apos;t undo this action.
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
