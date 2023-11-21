import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

import userService from "@/services/user";
import { UserRole } from "@/types";

export default authMiddleware({
  // url routes that don't require login
  publicRoutes: ["/auth/login", "/auth/sso-callback", "/auth/forgot-password"],

  async afterAuth(auth, req, evt){
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // handle users who are authenticated
    if (auth.userId) {
      const user = await userService.getUser(auth.userId);
      const roleProtectedRoutes = buildRoleProtectedRoutes();

      // handle access to routes based on user role
      if (!(roleProtectedRoutes[user.role].includes(req.nextUrl.pathname))){
        if(!(req.nextUrl.pathname.startsWith("/api/"))){
          return NextResponse.json({ error: 'Access Denied' }, { status: 401 })
        }
      }
    }
  }
});

// map of routes protected based on roles
type ProtectedRouteMap = Record<UserRole, string[]>

const buildRoleProtectedRoutes = (): ProtectedRouteMap => {
  // TODO: move protection of api routes to endpoints
  const publicRoutes = ["/auth/login", "/sso-callback", "/auth/forgot-password"]
  const clientRoutes = [...publicRoutes, '/','/repair-request']
  const repairerRoutes = [...clientRoutes, '/repair-attempt']
  const eventManagerRoutes = [...clientRoutes, ...repairerRoutes, '/event-listing']
  const adminRoutes = [...clientRoutes, ...repairerRoutes, ...eventManagerRoutes]
  // TODO: organisation routes

  return {
    [UserRole.CLIENT]: clientRoutes,
    [UserRole.REPAIRER]: repairerRoutes,
    [UserRole.EVENT_MANAGER]: eventManagerRoutes,
    [UserRole.ADMIN]: adminRoutes,
    [UserRole.ORGANISATION_MANAGER]: eventManagerRoutes
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
