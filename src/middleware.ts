import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/contact",
        "/about-us",
        "/sign-in",
        "/collections",
        "/collections/(.*)",
        "/products/(.*)",
        "/blogs",
        "/blogs/(.*)"
    ],
    ignoredRoutes: ["/api/(.*)"],
    async afterAuth(auth, req) {
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }

        if (auth.userId && !auth.isPublicRoute) {
            return NextResponse.next();
        }

        return NextResponse.next();
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
