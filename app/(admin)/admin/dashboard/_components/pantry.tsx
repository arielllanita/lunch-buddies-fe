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
import { Clock10, Minus, Plus } from "lucide-react";
import { Dispatch, useEffect, useState } from "react";
import { IDashboardAction, IDashboardState } from "../reducer";
import { createDishMenu, getPantry } from "@/services/dish_menu.service";
import { format } from "date-fns/format";
import { createMenu, deleteMenuByDate, getMenuByDate } from "@/services/menu.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type PantryProps = {
  state: IDashboardState;
  dispatch: Dispatch<IDashboardAction>;
};

export default function Pantry({ state, dispatch }: PantryProps) {
  const router = useRouter();

  const [date, setDate] = useState<Date>();

  // Get pantry
  useEffect(() => {
    (async () => {
      // Silly but will improve this
      if (!date) {
        setDate(new Date());
        return;
      }

      const response = await getPantry(date);
      const pantry = await response.map((x: any) => {
        return { ...x.dish_price_id, dish_availability: x.dish_availability };
      });

      // console.log("response", response);
      // console.log("date", date);
      // console.log("pantry", pantry);

      dispatch({ type: "IS_PANTRY_CLOSE", payload: response.length > 0 });

      if (response.length > 0) {
        dispatch({ type: "ADD_TO_PANTRY", payload: pantry });
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
                  deleteMenuByDate(date);
                  router.refresh();
                } else {
                  dispatch({ type: "CLEAR_PANTRY" });
                }
              }}
            >
              Clear
            </Button>

            {state.isPantryAlreadyAdded ? (
              <Button disabled>
                Add to Pantry <Plus />
              </Button>
            ) : (
              <SubmitPantryBtn state={state} date={date} />
            )}
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
                  <TableCell className="w-[20%]">{d.dish_id.dish_type}</TableCell>
                  <TableCell>{d.dish_id.dish_name}</TableCell>
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

function SubmitPantryBtn({ state, date }: { state: IDashboardState; date?: Date }) {
  const router = useRouter();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  async function submitPantry() {
    if (state.pantry.length < 1) {
      setIsOpenDialog(false);
      toast.error("Please add dish to the pantry");
      return;
    }

    const menuByDate = await getMenuByDate(date);
    if (menuByDate.length > 0) {
      await deleteMenuByDate(date);
    }

    const menu = await createMenu(date);

    const items = state.pantry.map((v) => ({
      dish_availability: v.dish_availability,
      dish_price_id: v.id,
    }));

    await createDishMenu({ items, menu_id: menu.id });

    router.refresh();
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          Add to Pantry <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add dish on you pantry</DialogTitle>
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
