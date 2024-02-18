import { useUser } from "@clerk/nextjs";

import { useUserRole } from "@/hooks/users";
import { UserRole } from "@/types";

export const useAuth = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { data: role, isLoading: isRoleLoading } = useUserRole(user?.id);

  return {
    user,
    role: role ?? UserRole.CLIENT,
    isSignedIn,
    isLoaded: isLoaded && !isRoleLoading // isLoaded is only true if role is not loading too.
  };
};
