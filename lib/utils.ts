import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDomain() {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXTAUTH_URL;
  } else {
    return "http://localhost:3000";
  }
}
