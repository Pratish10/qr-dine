import Link from "next/link";
import { ThemeSelect } from "./theme-select";
import { Button } from "@/components/ui/button";
import APP_PATHS from "@/config/path.config";
import { UserButton } from "@/components/auth/UserButton";
import React from "react";
import { useCurrentSession } from "@/hooks/useCurrentSession";

export const Navbar = async () => {
  const user = await useCurrentSession();
  return (
    <nav className="border-b-2 h-16">
      <div className="container flex items-center justify-between h-full">
        <Link href="/">Food Ordering System or logo here</Link>
        <div className="flex items-center justify-between space-x-4">
          <ThemeSelect />
          {!user ? (
            <React.Fragment>
              <Link href={APP_PATHS.LOGIN}>
                <Button>Login</Button>
              </Link>
              <Link href={APP_PATHS.REGISTER}>
                <Button>Register</Button>
              </Link>
            </React.Fragment>
          ) : (
            <UserButton
              // @ts-expect-error using ts-ignore beacuse of the isTwoEnabled property
              user={user}
            />
          )}
        </div>
      </div>
    </nav>
  );
};
