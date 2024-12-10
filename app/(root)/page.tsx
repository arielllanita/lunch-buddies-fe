import Footer from "@/components/footer";
import LoginForm from "./_components/login_form";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { auth_options } from "@/lib/auth_options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(auth_options);

  if (session) {
    redirect("/homepage");
  }

  return (
    <div className="h-screen bg-no-repeat bg-cover bg-[url('/images/pancit-shrimp.jpeg')]">
      <div className="h-full flex flex-col justify-center items-center space-y-2">
        <Image src={"/images/logo-lunch-buddies.png"} width={440} height={40} alt="Logo" />
        <LoginForm />
      </div>
      <Footer className="fixed bottom-0 w-full" />
    </div>
  );
}
