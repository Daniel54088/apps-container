import { authFormSchema } from "@/types/auth";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/utils/pet-db-queries";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login

        // validation
        const validatedAuthForm = authFormSchema.safeParse(credentials);
        if (!validatedAuthForm.success) {
          return null;
        }

        // extract values
        const { email, password } = validatedAuthForm.data;
        const user = await getUserByEmail(email);

        if (!user) {
          console.log("No user founded");
          return null;
        }
        const isPasswordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!isPasswordMatch) {
          console.log("Password is not correct");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLogin = !!auth?.user;
      const isTryingAccessingApp = request.nextUrl.pathname.includes("app");
      if (!isLogin && isTryingAccessingApp) {
        return false;
      }

      if (isLogin && isTryingAccessingApp) {
        return true;
      }

      if (isLogin && !isTryingAccessingApp) {
        return true;
      }

      if (!isLogin && !isTryingAccessingApp) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id;
        token.email = user.email!;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return "/app/dashboard";
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
