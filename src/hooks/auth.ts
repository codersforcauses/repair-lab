import { useUser } from "@clerk/nextjs";

import { PrismaUserRole } from "@/types";

export const useAuth = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  const role = (user?.publicMetadata.role ?? PrismaUserRole.CLIENT) as UserRole; // default to CLIENT if no roles set.

  return {
    user,
    role,
    isSignedIn,
    isLoaded
  };
};
