import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/auth/session`,
        {
            headers: {
                cookie: request.headers.get("cookie") ?? "",
            },
            cache: "no-store",
        }
    );

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