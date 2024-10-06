import Link from "next/link";
import { ThemeSelect } from "./theme-select";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="border-b-2 h-16">
      <div className="container flex items-center justify-between h-full">
        <Link href="/">Food Ordering System or logo here</Link>
        <div className="flex items-center justify-between space-x-4">
          <ThemeSelect />
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
      </div>
    </nav>
  );
};
