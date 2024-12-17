"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalCase } from "change-case";
import { ChevronRight, ShoppingCart, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { HomepageContext } from "../homepage/_context/homepage.context";
import { createOrder } from "@/actions/order.actions";
import { getMenuToday } from "@/actions/menu.actions";
import { toast } from "sonner";

export default function UserCartIcon() {
  const { state, dispatch, socket } = useContext(HomepageContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const submitCart = async () => {
    const payload = state.cart.map((item) => ({
      menuId: item.id,
      orderQuantity: item.orderQuantity,
      note: item.note,
    }));

    const { status, msg } = await createOrder(payload);

    if (status === "success") {
      const updatedMenus = await getMenuToday();
      socket?.emit("fetch_menu_today", updatedMenus);
      toast.success(msg);
    } else {
      toast.error(msg);
    }

    dispatch({ type: "CLEAR_CART" });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer" title="My Cart">
          {state.cart.length > 0 && (
            <Badge className="absolute -left-2 -top-2 bg-orange-500 hover:bg-orange-500 px-1 py-0 rounded-full">
              {state.cart.length}
            </Badge>
          )}
          <ShoppingCart className="text-primary" />
        </div>
      </DialogTrigger>

      <DialogContent className="md:left-[80%] 2xl:left-[85%] top-[18rem] p-0">
        {/* <DialogContent className="left-[0] right-[5rem] top-[18rem] p-0"> */}
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            <div className="flex items-center gap-2">
              <ShoppingCart /> <span>My Cart</span>
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <ScrollArea className="h-[20rem]">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow>
                <TableHead className="text-black font-bold">Order</TableHead>
                <TableHead className="text-black font-bold">Quantity</TableHead>
                <TableHead className="text-black font-bold">Price</TableHead>
                <TableHead className="text-black font-bold">Discount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{item.dish.name}</span>
                      <span className="text-primary text-xs">
                        {capitalCase(item.dish.type)} Dish
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[15%]">
                    <Input
                      type="number"
                      value={item.orderQuantity}
                      onChange={(e) => {
                        const orderQuantity = Number(e.target.value);
                        dispatch({
                          type: "EDIT_CART",
                          payload: { ...item, orderQuantity },
                        });
                      }}
                      max={item.quantity - (state.menu.find((v) => v.id === item.id)?.totalOrder || 0)}
                      min={1}
                    />
                  </TableCell>
                  <TableCell>&#x20B1;{item.dish.price.toFixed(2)}</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => dispatch({ type: "REMOVE_TO_CART", payload: item.id })}
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <DialogFooter className="p-6 pt-0">
          <Button className="w-full" disabled={state.cart.length === 0} onClick={submitCart}>
            Confirm my Orders <ChevronRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
