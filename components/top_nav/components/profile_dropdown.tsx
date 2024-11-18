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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileDropDown({ profile: { user } }: { profile: Session }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAdmin = user.role === "Admin";
  const isInAdminRoutes = pathname.startsWith("/admin");
  const isShowAdminMenu = isAdmin && !isInAdminRoutes;

  const Arrow = () => {
    if (isDropdownOpen) return <ChevronUp className="text-primary" />;
    return <ChevronDown className="text-primary" />;
  };

  const adminHandler = () => router.replace("/admin/dashboard");
  const myOrdersHandler = () => {};
  const hompageHandler = () => router.replace("/employee");
  const changePasswordHandler = () => {};
  const signOutHandler = () => signOut({ callbackUrl: "/" });

  // change password api
  // http://localhost:8000/user/d7d0e9b4-fc42-4385-a120-a45babdfd7a7

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
        {isShowAdminMenu && (
          <DropdownMenuItem onSelect={adminHandler}>
            <UserCog />
            <span>Admin</span>
          </DropdownMenuItem>
        )}
        {isInAdminRoutes ? (
          <DropdownMenuItem onSelect={hompageHandler}>
            <Home />
            <span>Homepage</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={myOrdersHandler}>
            <ShoppingCart />
            <span>My Orders</span>
          </DropdownMenuItem>
        )}
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
