import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.user.role === "ADMIN";
      }

      return Boolean(token);
    },
  },
});

export const config = { matcher: ["/admin/:path*", "/employee/:path*"] };
