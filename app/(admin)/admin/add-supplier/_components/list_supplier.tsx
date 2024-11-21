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
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function ListSupplier({ suppliers }: { suppliers: ISupplier[] }) {
  const [table, setTable] = useState<{ isEditing: boolean; data?: ISupplier }>();

  const updateSupplier = async (values: ISupplier) => {
    if (!table?.isEditing) {
      setTable(() => ({ data: values, isEditing: true }));
    } else {
      // const statusCode = await updateSupplier(table.data!);
      console.log("data", table);
    }
  };

  const changeHandler = (
    key: "supplier_name" | "main_dish_free" | "side_dish_free",
    value: string | boolean
  ) => {
    setTable((v) => ({ isEditing: true, data: { ...v!.data, [key]: value } as ISupplier }));
  };

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
                  {table?.isEditing && table.data?.id == x.id ? (
                    <>
                      <TableCell>
                        <Input
                          defaultValue={x.supplier_name}
                          onChange={(v) => changeHandler("supplier_name", v.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          defaultChecked={x.main_dish_free}
                          onCheckedChange={(checked) => changeHandler("main_dish_free", checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          defaultChecked={x.side_dish_free}
                          onCheckedChange={(checked) => changeHandler("side_dish_free", checked)}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{x.supplier_name}</TableCell>
                      <TableCell>{x.main_dish_free ? <Check /> : <X />}</TableCell>
                      <TableCell>{x.side_dish_free ? <Check /> : <X />}</TableCell>
                    </>
                  )}
                  <TableCell>
                    <div className="flex gap-4">
                      <Button variant={"outline"} size={"icon"} onClick={() => updateSupplier(x)}>
                        {table?.isEditing && table.data?.id == x.id ? (
                          <Save className="text-primary" />
                        ) : (
                          <SquarePen />
                        )}
                      </Button>

                      {table?.isEditing && table.data?.id == x.id ? (
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          onClick={() => setTable({ data: undefined, isEditing: false })}
                        >
                          <X />
                        </Button>
                      ) : (
                        <DeleteSupplierBtn supplier={x} />
                      )}
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

function UpdateSupplierBtn({ supplier }: { supplier: ISupplier }) {}

function DeleteSupplierBtn({ supplier }: { supplier: ISupplier }) {
  const router = useRouter();

  const removeHandler = async () => {
    const statusCode = await removeSupplier(supplier.id!);

    // Request has been successfully completed
    if (statusCode === 204) {
      router.refresh();
    }
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
