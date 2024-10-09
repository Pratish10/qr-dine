import { auth } from "@/auth";

export const useCurrentSession = async () => {
  const session = await auth();
  return session?.user;
};
