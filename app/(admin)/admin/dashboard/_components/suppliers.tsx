"use client";

import { getDish } from "@/actions/dish.actions";
import { getSuppliers } from "@/actions/supplier.action";
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
import { capitalCase } from "change-case";
import { debounce } from "lodash";
import { Plus } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { DashboardContext } from "../_context/dashboard.context";

export default function Suppliers() {
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const { state, dispatch } = useContext(DashboardContext);

  // Fetch suppliers
  useEffect(() => {
    (async () => {
      const suppliers = await getSuppliers();
      dispatch({ type: "ADD_SUPPLIER", payload: suppliers });
    })();
  }, [dispatch]);

  // Fetch dish by supplier
  useEffect(() => {
    (async () => {
      if (!selectedSupplier) return;

      const dishes = await getDish({ supplierId: selectedSupplier });
      dispatch({ type: "ADD_DISH", payload: dishes });
    })();
  }, [selectedSupplier, dispatch]);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <h1 className="text-3xl">Suppliers</h1>

        <div className="grid grid-cols-2 gap-3">
          <Select
            value={selectedSupplier}
            onValueChange={setSelectedSupplier}
            disabled={state.isPantryAlreadyAdded}
          >
            <SelectTrigger>
              <SelectValue placeholder="Supplier name" />
            </SelectTrigger>
            <SelectContent>
              {state.suppliers.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Search"
            onChange={debounce(function (e: ChangeEvent<HTMLInputElement>) {
              // TODO: FILTER DISH BY NAME
              const value = e.target.value.trim();
            }, 2000)}
            disabled={state.isPantryAlreadyAdded}
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
                  <TableCell>{capitalCase(`${d.type} Dish`)}</TableCell>
                  <TableCell>{d.name}</TableCell>
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
