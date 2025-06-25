import { clerkMiddleware } from "@clerk/nextjs/server";

console.log("DEBUG: Setting up Clerk middleware");

export default clerkMiddleware({
  publicRoutes: ["/"],  // Make sure this key is spelled correctly for your version
});

export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};
