import { auth } from "@/auth";

export const useAuthenticatedStatus = async () => {
  const session = await auth();

  return session;
};
