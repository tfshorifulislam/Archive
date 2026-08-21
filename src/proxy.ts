import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const cookie = request.headers.get("cookie");

    console.log("COOKIE:", cookie);

    const response = await fetch(
        `${process.env.BACKEND_URL}/api/session`,
        {
            headers: {
                cookie: cookie ?? "",
            },
            cache: "no-store",
        }
    );

    console.log("SESSION STATUS:", response.status);

    const data = await response.text();
    console.log("SESSION RESPONSE:", data);

    if (!response.ok) {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/settings/:path*",
        '/profile'
    ],
};