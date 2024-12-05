import { loginUser } from "@/actions/user.action";
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

        const data = await loginUser(credentials.email, credentials.password);

        if (!data) return null;

        const sessionUser = {
          id: data.id,
          first_name: data.firstName,
          last_name: data.lastName,
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
    maxAge: 518400, // 6 days
  },
};
