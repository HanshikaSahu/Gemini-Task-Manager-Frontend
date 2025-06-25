import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except the ones listed below
    "/((?!_next|favicon.ico|api|sign-in|sign-up).*)",
  ],
};
