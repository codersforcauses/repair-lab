import { useEffect } from "react";
import { useRouter } from "next/router";

import Loading from "@/components/loading";
import { useAuth } from "@/hooks/auth";
import { NextPageWithLayout } from "@/pages/_app";
import { UserRole } from "@/types";

export const withProtected = (Component: NextPageWithLayout) => {
  function PrivateComponent(props: object) {
    const { user, role, isLoaded, isSignedIn } = useAuth();
    const router = useRouter();
    const currentRoute = router.route;

    useEffect(() => {
      // handling protection based on the user's role.
      const roleProtectedRoutes = buildRoleProtectedRoutes();

      if (
        isLoaded &&
        !roleProtectedRoutes[role].some((regex) => regex.test(currentRoute))
      ) {
        router.replace("/401");
      }
    }, [user, router, currentRoute, role, isLoaded, isSignedIn]);

    if (!isLoaded) {
      return <Loading />;
    }

    return <Component {...props} />;
  }

  return PrivateComponent as NextPageWithLayout;
};

// map of routes protected based on roles
type ProtectedRouteMap = Record<UserRole, RegExp[]>;

const buildRoleProtectedRoutes = (): ProtectedRouteMap => {
  const publicRoutes = [new RegExp(PageRouteRegex.AUTH)];
  const clientRoutes = [
    ...publicRoutes,
    new RegExp(PageRouteRegex.ROOT),
    new RegExp(PageRouteRegex.REPAIR_REQUEST),
    new RegExp(PageRouteRegex.EVENTS)
  ];
  const repairerRoutes = [
    ...clientRoutes,
    new RegExp(PageRouteRegex.REPAIR_ATTEMPT)
  ];
  const eventManagerRoutes = [
    ...clientRoutes,
    ...repairerRoutes,
    new RegExp(PageRouteRegex.MANAGE)
  ];
  const adminRoutes = [new RegExp(PageRouteRegex.ALL)];

  return {
    [UserRole.CLIENT]: clientRoutes,
    [UserRole.REPAIRER]: repairerRoutes,
    [UserRole.EVENT_MANAGER]: eventManagerRoutes,
    [UserRole.ADMIN]: adminRoutes
  } as Record<UserRole, RegExp[]>;
};

// middleware route
export enum PageRouteRegex {
  ROOT = "/$",
  AUTH = "/auth",
  EVENTS = "^/events",
  MANAGE = "/manage",
  REPAIR_REQUEST = "/repair-request$",
  REPAIR_ATTEMPT = "/repair-request",
  ALL = "/"
}
