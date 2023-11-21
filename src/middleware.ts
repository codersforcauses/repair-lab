import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

import { isAuthorised } from "@/services/auth";
import UserService from "@/services/user"
import { UserRole } from "@/types";

export default authMiddleware({
  // url routes that don't require login
  publicRoutes: ["/auth/login", "/sso-callback", "/auth/forgot-password"],

  async afterAuth(auth, req, evt){
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // handle users who are authenticated
    if (auth.userId) {
      const userService = new UserService();
      const user = await userService.getUser(auth.userId);
      const roleProtectedRoutes = buildRoleProtectedRoutes();

      // handle access to routes based on user role
      if (!(roleProtectedRoutes[user.role].includes(req.nextUrl.pathname))){
        if(!(req.nextUrl.pathname.startsWith("/api/"))){
          return NextResponse.json({ error: 'Access Denied' }, { status: 401 })
        }
        isAuthorised(auth.userId, req.nextUrl.pathname, req.method)
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
  const volunteerRoutes = [...clientRoutes, '/repair-attempt']
  const eventManagerRoutes = [...clientRoutes, ...volunteerRoutes, '/event-listing']
  const adminRoutes = [...clientRoutes, ...volunteerRoutes, ...eventManagerRoutes]

  return {
    [UserRole.CLIENT]: clientRoutes,
    [UserRole.VOLUNTEER]: volunteerRoutes,
    [UserRole.EVENT_MANAGER]: eventManagerRoutes,
    [UserRole.ADMIN]: adminRoutes
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
