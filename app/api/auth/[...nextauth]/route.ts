import { auth_options } from "@/lib/auth_options";
import NextAuth from "next-auth";

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };
