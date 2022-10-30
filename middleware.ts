import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");

        const { BASIC_USERNAME, BASIC_PASSWORD } = process.env;

        const parsed = atob(authHeader?.split(" ")[1] as string);

        const [user, pass] = parsed.toString().split(":");

        if (user === BASIC_USERNAME && pass === BASIC_PASSWORD) {
            return NextResponse.next();
        } else {
            req.nextUrl.searchParams.set("from", req.nextUrl.basePath);
            req.nextUrl.pathname = "/api/auth-error"
            return NextResponse.redirect(req.nextUrl);
        }
    } catch (e) {
        req.nextUrl.searchParams.set("error", e as string);
        req.nextUrl.pathname = "/api/middleware-error"
        return NextResponse.redirect(req.nextUrl);
    }
}

export const config = {
    matcher: [ 
        "/api/youtube/:path*",
        "/api/twitter/:path*",
        "/api/spotify/:path*",
        "/api/test"
     ]
}

export default middleware;