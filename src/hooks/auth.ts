import { useUser } from "@clerk/nextjs";

import { UserRole } from "@/types";

export const useAuth = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  const role = user?.publicMetadata.role as UserRole;

  return {
    user,
    role,
    isSignedIn,
    isLoaded
  };
};
