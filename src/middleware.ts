/* eslint-disable no-useless-escape */
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  // url routes that don't require login
  publicRoutes: [
    "/auth/login",
    "/auth/sso-callback",
    "/auth/forgot-password",
    "/auth/register"
  ],

  async afterAuth(auth, req) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
