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
import { getDishPrice } from "@/services/dish.service";
import { getSupplier } from "@/services/supplier.service";
import { Plus } from "lucide-react";
import { ChangeEvent, Dispatch, useEffect } from "react";
import { IDashboardAction, IDashboardState } from "../page";
import { debounce } from "lodash";

export type SupplierProps = {
  state: IDashboardState;
  dispatch: Dispatch<IDashboardAction>;
};

export default function Suppliers({ dispatch, state }: SupplierProps) {
  useEffect(() => {
    (async () => {
      const promises = await Promise.all([getSupplier(60 * 2), getDishPrice()]);

      dispatch({ type: "ADD_SUPPLIER", payload: promises[0] });
      dispatch({ type: "ADD_DISH", payload: promises[1] });
    })();
  }, [dispatch, state.triggerFetch]);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <h1 className="text-3xl">Suppliers</h1>

        <div className="grid grid-cols-2 gap-3">
          <Select
            onValueChange={(value) => {
              if (state.dishes.length) {
                
              }
              dispatch({ type: "FILTER_DISH_BY_SUPPLIER", payload: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Supplier name" />
            </SelectTrigger>
            <SelectContent>
              {state.suppliers.map((s) => (
                <SelectItem key={s.id} value={s.id!}>
                  {s.supplier_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Search"
            onChange={debounce(function (e: ChangeEvent<HTMLInputElement>) {
              const value = e.target.value.trim();
              if (value === "") {
                dispatch({ type: "REFETCH_DISHES_SUPPLIERS" });
              } else {
                dispatch({ type: "FILTER_DISH_BY_NAME", payload: value });
              }
            }, 2000)}
          />
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
              {state.dishes.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.dish_id.dish_type}</TableCell>
                  <TableCell>{d.dish_id.dish_name}</TableCell>
                  <TableCell>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => {
                        dispatch({ type: "ADD_TO_PANTRY", payload: d });
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
