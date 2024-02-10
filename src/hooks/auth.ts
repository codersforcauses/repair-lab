import { useUser } from "@clerk/nextjs";

import { useUserRole } from "@/hooks/users";
import { UserRole } from "@/types";

export const useAuth = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { data: role } = useUserRole(user?.id);

  return {
    user,
    role: role ?? UserRole.CLIENT,
    isSignedIn,
    isLoaded
  };
};
