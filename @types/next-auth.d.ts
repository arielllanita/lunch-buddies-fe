import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * Extend next-auth typings for the authenticated user
 */
type ExtendedUser = {
  id?: string;
  role?: "USER" | "ADMIN";
  first_name?: string;
  last_name?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
  }

  interface User extends DefaultUser, ExtendedUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendedUser;
  }
}
