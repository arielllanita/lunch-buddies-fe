import Logo from "@/components/logo";
import Timer from "@/components/timer";
import { auth_options } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import UserCartIcon from "./user_cart";
import ProfileDropDown from "./profile_dropdown";

export default async function TopNav() {
  const session = await getServerSession(auth_options);

  return (
    <header className="bg-black h-16 px-6 pt-4 pb-3 flex justify-between">
      <Logo />

      <div className="flex gap-x-3">
        <Timer />
        <ProfileDropDown profile={session!} />
        <UserCartIcon />
      </div>
    </header>
  );
}
