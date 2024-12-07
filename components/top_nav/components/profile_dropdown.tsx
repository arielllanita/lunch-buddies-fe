"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronUp,
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
import { useState } from "react";

export default function ProfileDropDown({ profile: { user } }: { profile: Session }) {
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAdmin = user.role === "ADMIN";
  const isInAdminRoutes = pathname.startsWith("/admin");
  const isShowAdminMenu = isAdmin && !isInAdminRoutes;

  const myOrdersHandler = () => {};
  const changePasswordHandler = () => {};
  const signOutHandler = () => signOut({ callbackUrl: "/" });

  return (
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
            <Link href={"/employee"} className="text-black cursor-pointer">
              <Home />
              <span>Homepage</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={myOrdersHandler} className="cursor-pointer">
            <ShoppingCart />
            <span>My Orders</span>
          </DropdownMenuItem>
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
  );
}
