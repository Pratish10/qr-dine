import React from "react";
import { ThemeProvider } from "./theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const Providers = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
