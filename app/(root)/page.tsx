import Footer from "@/components/footer";
import LoginForm from "./components/login_form";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { auth_options } from "@/lib/auth_options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(auth_options);

  if (session) {
    redirect("/employee");
  }

  return (
    <div className="h-screen bg-no-repeat bg-cover bg-[url('/images/pancit-shrimp.jpeg')]">
      <div className="h-full flex flex-col justify-center items-center space-y-2">
        <Image src={"/images/logo-lunch-buddies.png"} width={440} height={40} alt="Logo" />
        <LoginForm />
      </div>
      <Footer className="absolute bottom-0 w-full" />
    </div>
  );
}
