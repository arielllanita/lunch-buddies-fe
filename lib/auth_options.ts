import { userLogin } from "@/services/user.service";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const auth_options: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const data = await userLogin(JSON.stringify(credentials));

        // NOTE: We can improve the api to use the proper status codes
        if (!data.role) return null;

        const sessionUser = {
          id: data.userid,
          first_name: data.firstname,
          last_name: data.lastname,
          role: data.role,
        };

        return sessionUser;
      },
      type: "credentials",
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: { signIn: "/" },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 6, // 6 days
  },
};
