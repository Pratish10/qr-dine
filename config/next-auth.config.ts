import prisma from "@/db";
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor-confirmation";
import { getUserByEmail, getUserById } from "@/lib/user";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { LoginUserSchema } from "@/schemas/schema";
import bcryptjs from "bcryptjs";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "ironman@marvel.com",
        },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials) {
        const validatedFields = LoginUserSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.encryptedPassword) return null;

          const passwordMatch = await bcryptjs.compare(
            password,
            user.encryptedPassword
          );

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (existingUser?.emailVerified === null) return false;

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if ("isTwoFactorEnabled" in token && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      //   if (token.role && session.user) {
      //     session.user.role = token.role;
      //   }

      if (session.user) {
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      //   token.role = existingUser.role;
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
};
