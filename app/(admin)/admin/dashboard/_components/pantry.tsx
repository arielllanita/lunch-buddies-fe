"use client";

import { DatePickerWithPresets } from "@/components/date_picker_with_presets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDishType } from "@/services/dish.service";
import { Clock10, Minus, Plus } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";

export type PantryRef = {
  addDish: (dish: IDishType) => void;
};

const Pantry = forwardRef<PantryRef, {}>((props, ref) => {
  const [date, setDate] = useState<Date>();
  const [dishes, setDishes] = useState<IDishType[]>([]);

  useImperativeHandle(ref, () => ({
    addDish: (dish) => setDishes((v) => v.concat(dish)),
  }));

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex justify-between">
          <h1 className="text-3xl">Pantry</h1>

          <div className="flex gap-2">
            <Button variant={"outline"}>Clear</Button>
            <Button>
              Add to Pantry <Plus />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <DatePickerWithPresets date={date} setDate={setDate} />
          </div>
          <div className="flex items-center justify-between border rounded py-1 px-3">
            <span className="text-sm text-muted-foreground">10:00 AM</span>{" "}
            <Clock10 className="text-primary" />
          </div>
          <div className="flex items-center gap-3">
            <Switch defaultChecked />
            <span className="text-sm text-muted-foreground">Time Limit</span>
          </div>
        </div>

        <ScrollArea className="h-[30rem]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Dish Name</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dishes?.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="w-[20%]">{d.dish_id.dish_type}</TableCell>
                  <TableCell>{d.dish_id.dish_name}</TableCell>
                  <TableCell>
                    <Input type="number" defaultValue={10} min={1} />
                  </TableCell>
                  <TableCell>
                    <Button size={"icon"} variant={"ghost"}>
                      <Minus className="text-destructive" />
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
});

Pantry.displayName = "Pantry";

export default Pantry;
