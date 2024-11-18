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
import { ISupplier, removeSupplier } from "@/services/supplier.service";
import { Check, Save, SquarePen, Trash, X } from "lucide-react";
import { useState } from "react";

export default function ListSupplier({ suppliers }: { suppliers: ISupplier[] }) {
  const [table, setTable] = useState<{ isEditing: boolean; data?: ISupplier }>();

  const editMode = () => setTable((v) => ({ data: undefined, isEditing: true }));

  const saveHandler = () => {};

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <h1 className="text-3xl mb-4">Food Suppliers</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Free Main Dish</TableHead>
                <TableHead>Free Side Dish</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((x) => (
                <TableRow key={x.id}>
                  <TableCell>{x.supplier_name}</TableCell>
                  <TableCell>{x.main_dish_free ? <Check /> : <X />}</TableCell>
                  <TableCell>{x.side_dish_free ? <Check /> : <X />}</TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <Button variant={"outline"} size={"icon"}>
                        {table?.isEditing ? <Save /> : <SquarePen />}
                      </Button>

                      <DeleteSupplier supplier={x} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function DeleteSupplier({ supplier }: { supplier: ISupplier }) {
  const removeHandler = async () => {
    const res = await removeSupplier(supplier.id!);
    console.log("DELETE", res);
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
