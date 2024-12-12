import { auth_options } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import HomepageWrapper from "./_components/homepage.wrapper";

export default async function Employee() {
  const session = await getServerSession(auth_options);

  return (
    <>
      <div className="px-16 py-10">
        <h1 className="text-4xl">Good morning, {session?.user.first_name}!</h1>
        <p className="text-lg">What&apos;s your food mood today?</p>
      </div>

      <HomepageWrapper />
    </>
  );
}
