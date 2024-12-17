"use client";

import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { sumBy } from "lodash";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Frown,
  Home,
  KeyRound,
  LogOut,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { HomepageContext } from "../homepage/_context/homepage.context";

export default function ProfileDropDown({ profile: { user } }: { profile: Session }) {
  const { state } = useContext(HomepageContext);
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const isAdmin = user.role === "ADMIN";
  const isInAdminRoutes = pathname.startsWith("/admin");
  const isShowAdminMenu = isAdmin && !isInAdminRoutes;

  const myOrdersHandler = () => {};
  const changePasswordHandler = () => {};
  const signOutHandler = () => signOut({ callbackUrl: "/" });

  return (
    <Dialog>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild className="border-none">
          <div className="text-white flex cursor-pointer">
            <span>
              {user.last_name}, {user.first_name}
            </span>
            {isDropdownOpen ? (
              <ChevronUp className="text-primary" />
            ) : (
              <ChevronDown className="text-primary" />
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {isShowAdminMenu && (
            <DropdownMenuItem asChild>
              <Link href={"/admin/dashboard"} className="text-black cursor-pointer">
                <UserCog />
                <span>Admin</span>
              </Link>
            </DropdownMenuItem>
          )}

          {isInAdminRoutes ? (
            <DropdownMenuItem asChild>
              <Link href={"/homepage"} className="text-black cursor-pointer">
                <Home />
                <span>Homepage</span>
              </Link>
            </DropdownMenuItem>
          ) : (
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={myOrdersHandler} className="cursor-pointer">
                <ShoppingCart />
                <span>My Orders</span>
              </DropdownMenuItem>
            </DialogTrigger>
          )}

          <DropdownMenuItem onSelect={changePasswordHandler} className="cursor-pointer">
            <KeyRound />
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={signOutHandler} className="cursor-pointer">
            <LogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            <div className="flex items-center gap-2">
              <ShoppingCart /> <span>My Order</span>
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {state.orders.length > 0 ? (
          <ScrollArea className="max-h-[20rem]">
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
                {state.orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{order.menu.dish.name}</span>
                        <span className="text-primary text-xs">
                          {capitalCase(order.menu.dish.type)} Dish
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>&#x20B1;{order.dishPrice.toFixed(2)}</TableCell>
                    <TableCell>&#x20B1;{order.discount}</TableCell>
                    <TableCell>
                      <Check className="text-primary" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex flex-col p-3">
              <div className="flex gap-3 justify-end">
                <span>Total cost:</span>
                <span className="font-bold">
                  &#x20B1;
                  {(sumBy(state.orders, "total") + sumBy(state.orders, "discount")).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 justify-end">
                <span>Discount:</span>
                <span className="font-bold text-primary">
                  &#x20B1;{sumBy(state.orders, "discount").toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-3">
              <span>Total Amount Due</span>
              <span className="font-bold">&#x20B1;{sumBy(state.orders, "total").toFixed(2)}</span>
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center">
            <div className="flex justify-center">
              <Frown className="text-primary" size={30} />
            </div>
            <p className="text-lg">You have no active orders.</p>
            <p className="text-base">Looks like you haven&apos;t placed any orders yet</p>
          </div>
        )}

        <DialogFooter className="p-6 pt-0">
          <DialogClose asChild>
            <Button className="w-full">Back to Home</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
