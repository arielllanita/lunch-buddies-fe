import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: "Employee" | "Admin";
      first_name?: string;
      last_name?: string;
    } & DefaultSession["user"];
  }
}
