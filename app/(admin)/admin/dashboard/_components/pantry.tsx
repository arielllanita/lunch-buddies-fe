"use client";

import { createMenu, getMenus } from "@/actions/menu.actions";
import { DatePickerWithPresets } from "@/components/date_picker_with_presets";
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
import { Clock10, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { DashboardContext } from "../_context/dashboard.context";
import { IDashboardState } from "../_context/dashboard.reducer";
import { startOfDay } from "date-fns/startOfDay";
import { endOfDay } from "date-fns/endOfDay";
import { capitalCase } from "change-case";

export default function Pantry() {
  const router = useRouter();
  const { state, dispatch } = useContext(DashboardContext);

  const [date, setDate] = useState<Date | undefined>(new Date());

  // Check if pantry is already set
  useEffect(() => {
    (async () => {
      const menus = await getMenus({ date: { gte: startOfDay(date!), lte: endOfDay(date!) } });
      const isPantryAlreadyAdded = menus.length > 0;

      dispatch({ type: "IS_PANTRY_CLOSE", payload: isPantryAlreadyAdded });

      if (isPantryAlreadyAdded) {
        const dishes = menus.map((menu) => ({ ...menu.dish, dish_availability: menu.quantity }));
        dispatch({ type: "ADD_TO_PANTRY", payload: dishes });
      } else {
        dispatch({ type: "CLEAR_PANTRY" });
      }
    })();
  }, [date, dispatch]);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex justify-between">
          <h1 className="text-3xl">Pantry</h1>

          <div className="flex gap-2">
            <Button
              variant={"outline"}
              onClick={() => {
                if (state.isPantryAlreadyAdded) {
                  // TODO: ADD CLEAR MENU FUNCTION
                  router.refresh();
                } else {
                  dispatch({ type: "CLEAR_PANTRY" });
                }
              }}
            >
              Clear
            </Button>

            <SubmitPantryBtn state={state} date={date!} />
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
              {state.pantry.map((d) => (
                <TableRow
                  key={d.id}
                  className={
                    state.isPantryAlreadyAdded
                      ? "text-muted-foreground hover:bg-card hover:cursor-not-allowed"
                      : ""
                  }
                >
                  <TableCell className="w-[20%]">{capitalCase(`${d.type} Dish`)}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell className="w-[20%]">
                    <Input
                      type="number"
                      value={d.dish_availability}
                      min={1}
                      onChange={(e) => {
                        const dish_availability = Number(e.target.value);
                        dispatch({ type: "EDIT_PANTRY", payload: { ...d, dish_availability } });
                      }}
                      disabled={state.isPantryAlreadyAdded}
                    />
                  </TableCell>
                  <TableCell className="w-[10%]">
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => dispatch({ type: "REMOVE_FROM_PANTRY", payload: d.id })}
                      disabled={state.isPantryAlreadyAdded}
                    >
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
}

function SubmitPantryBtn({ state, date }: { state: IDashboardState; date: Date }) {
  const router = useRouter();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  async function submitPantry() {
    if (state.pantry.length < 1) {
      setIsOpenDialog(false);
      toast.error("Please add dish to your pantry");
      return;
    }

    const menus = await createMenu(
      state.pantry.map((x) => ({ dishId: x.id, quantity: x.dish_availability, date }))
    );

    if (menus.count > 0) {
      toast.success("Pantry added successfully!");
      setIsOpenDialog(false);
      router.refresh();
    }
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <Button onClick={() => setIsOpenDialog(true)} disabled={state.isPantryAlreadyAdded}>
        Add to Pantry <Plus />
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add dish on your pantry</DialogTitle>
          <DialogDescription>
            Are you sure do you want to add these dishes on your pantry?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button onClick={submitPantry}>Yes, Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
