import ProfileDropDown from "@/components/top_nav/components/profile_dropdown";
import Timer from "@/components/top_nav/components/timer";
import { auth_options } from "@/lib/auth_options";
import { ShoppingCart } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function TopNav() {
  const session = await getServerSession(auth_options);

  return (
    <div className="flex gap-2 px-3 pt-2">
      <Timer className="mr-2" />
      <ProfileDropDown profile={session!} />
      <ShoppingCart className="text-primary" />
    </div>
  );
}
