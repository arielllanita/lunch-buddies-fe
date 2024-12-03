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
import { getSupplier } from "@/services/supplier.service";
import { debounce } from "lodash";
import { Plus } from "lucide-react";
import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { IDashboardAction, IDashboardState } from "../reducer";
import { getDishBySupplier } from "@/services/dish_menu.service";

export type SupplierProps = {
  state: IDashboardState;
  dispatch: Dispatch<IDashboardAction>;
};

export default function Suppliers({ dispatch, state }: SupplierProps) {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [dishes, setDishes] = useState<IDishType[]>([]);

  // Fetch suppliers
  useEffect(() => {
    (async () => {
      const suppliers = await getSupplier();
      dispatch({ type: "ADD_SUPPLIER", payload: suppliers });
    })();
  }, [dispatch]);

  // Fetch dish by supplier
  useEffect(() => {
    (async () => {
      if (!selectedSupplier) return;

      const dishes = await getDishBySupplier(selectedSupplier);
      dispatch({ type: "ADD_DISH", payload: dishes });
    })();
  }, [selectedSupplier, dispatch, state.triggerFetch]);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <h1 className="text-3xl">Suppliers</h1>

        <div className="grid grid-cols-2 gap-3">
          <Select
            value={selectedSupplier}
            onValueChange={(id) => {
              if (!state.isPantryAlreadyAdded) {
                dispatch({ type: "CLEAR_PANTRY" });
              }
              setSelectedSupplier(id);
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
                dispatch({ type: "REFETCH_DISHES" });
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
                  <TableCell className="w-[10%]">
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_PANTRY",
                          payload: { ...d, dish_availability: 10 },
                        });
                      }}
                      disabled={state.isPantryAlreadyAdded}
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
