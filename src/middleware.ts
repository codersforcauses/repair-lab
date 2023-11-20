import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // url routes that don't require login
  publicRoutes: ["/auth/login", "/auth/sso-callback", "/auth/forgot-password"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
