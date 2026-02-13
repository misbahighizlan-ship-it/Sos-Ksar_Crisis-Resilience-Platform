import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");
    const { pathname, searchParams } = request.nextUrl;

    // Define protected routes
    const isProtected =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/volunteer") ||
        pathname.startsWith("/urgency/create") ||
        pathname.startsWith("/report") ||
        pathname.startsWith("/admin");

    if (isProtected && !sessionCookie) {
        const loginUrl = new URL("/login", request.url);
        const callbackURL = searchParams.size > 0
            ? `${pathname}?${searchParams.toString()}`
            : pathname;
        loginUrl.searchParams.set("callbackURL", callbackURL);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
