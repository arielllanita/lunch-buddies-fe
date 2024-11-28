"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDishType, getDishPrice } from "@/services/dish.service";
import { ISupplier, getSupplier } from "@/services/supplier.service";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export type SupplierProps = {
  addDish: (dish: IDishType) => void;
};

export default function Suppliers({ addDish }: SupplierProps) {
  const [suppliers, setSuppliers] = useState<ISupplier[]>();
  const [dishes, setDishes] = useState<IDishType[]>();

  useEffect(() => {
    (async () => {
      const promises = await Promise.all([getSupplier(60 * 2), getDishPrice()]);

      setSuppliers(promises[0]);
      setDishes(promises[1]);
    })();
  }, []);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <h1 className="text-3xl">Suppliers</h1>

        <div className="grid grid-cols-2 gap-3">
          {/* TODO: ADD FILTER ACTIONS */}
          <Select onValueChange={(value) => console.log(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Supplier name" />
            </SelectTrigger>
            <SelectContent>
              {suppliers?.map((s) => (
                <SelectItem key={s.id} value={s.id!}>
                  {s.supplier_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input placeholder="Search" />
        </div>

        <ScrollArea className="h-[30rem]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Dish Name</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dishes?.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.dish_id.dish_type}</TableCell>
                  <TableCell>{d.dish_id.dish_name}</TableCell>
                  <TableCell>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => {
                        addDish(d);
                      }}
                    >
                      <Plus className="text-primary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
