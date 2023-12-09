import { useUser } from "@clerk/nextjs";

import { UserRole } from "@/types";

export const useAuth = () => {
  console.log("pls work");
  const { user, isSignedIn, isLoaded } = useUser();

  const role = (user?.publicMetadata.role ?? UserRole.CLIENT) as UserRole; // default to CLIENT if no roles set.

  return {
    user,
    role,
    isSignedIn,
    isLoaded
  };
};