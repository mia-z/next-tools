import { NextResponse,NextRequest } from "next/server";

const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:8080", "https://miaz.xyz", "https://www.miaz.xyz"];

export async function middleware(req: NextRequest) {
    try {
        
        if (req.method === "OPTIONS") {
            if (ALLOWED_ORIGINS.includes(req.headers.get("Origin") as string)) {
                const response = NextResponse.next();
                response.headers.append("Access-Control-Allow-Credentials", "true");
                response.headers.append("Access-Control-Allow-Origin", req.headers.get("Origin") as string)
                response.headers.append("Vary", "Origin");
                return response;
            }
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
        "/api/test"
     ]
}

export default middleware;