"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, KeyRound, LogOut, ShoppingCart, UserCog } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileDropDown({ profile: { user } }: { profile: Session }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const isAdmin = user.role === "Admin";

  const Arrow = () => {
    if (isDropdownOpen) return <ChevronUp className="text-primary" />;
    return <ChevronDown className="text-primary" />;
  };

  const adminHandler = () => router.replace("/admin/dashboard");
  const myOrdersHandler = () => {};
  const changePasswordHandler = () => {};
  const signOutHandler = () => signOut({ callbackUrl: "/" });

  return (
    <DropdownMenu onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild className="border-none">
        <div className="text-white flex cursor-pointer">
          <span>
            {user.last_name}, {user.first_name}
          </span>
          <Arrow />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAdmin && (
          <DropdownMenuItem onSelect={adminHandler}>
            <UserCog />
            <span>Admin</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={myOrdersHandler}>
          <ShoppingCart />
          <span>My Orders</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={changePasswordHandler}>
          <KeyRound />
          <span>Change Password</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={signOutHandler}>
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
