import Logo from "./components/logo";
import Timer from "./components/timer";
import ProfileDropDown from "./components/profile_dropdown";
import { getServerSession } from "next-auth";
import { auth_options } from "@/lib/auth_options";
import { ShoppingCart } from "lucide-react";

export default async function TopNav() {
  const session = await getServerSession(auth_options);

  return (
    <div className="bg-black px-4 pt-4 pb-3 flex justify-between">
      <Logo />

      <div className="flex gap-x-3">
        <Timer />
        <ProfileDropDown profile={session!} />
        <ShoppingCart className="text-primary" />
      </div>
    </div>
  );
}
