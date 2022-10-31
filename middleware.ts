import { NextResponse,NextRequest } from "next/server";
import { ALLOWED_URLS } from "./lib/Config";

const HasValidOriginHeader = (header: string | null): boolean  => {
    if (!header) {
        return false;
    } else {
        if (ALLOWED_URLS.includes(header)) {
            return true
        } else return false;
    }
}

export async function middleware(req: NextRequest) {
    try {
        let validOrigin = HasValidOriginHeader(req.headers.get("Origin"));

        if (validOrigin) {
            return NextResponse.next();
        }

        const authHeader = req.headers.get("Authorization");

        const { BASIC_USERNAME, BASIC_PASSWORD } = process.env;

        const splitHeader = authHeader?.split(" ");

        if (!splitHeader) {
            req.nextUrl.searchParams.set("from", req.nextUrl.basePath);
            req.nextUrl.pathname = "/api/auth-error"
            return NextResponse.redirect(req.nextUrl);
        }

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
        "/api/spotify/:path*",
        "/api/twitter/:path*",
        "/api/test"
     ]
}

export default middleware;