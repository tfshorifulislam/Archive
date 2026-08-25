import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const cookie = request.headers.get("cookie");

    console.log("========== PROXY ==========");
    console.log("PATH:", request.nextUrl.pathname);
    console.log("COOKIE:", cookie);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`,
        {
            method: "GET",
            headers: {
                Cookie: cookie ?? "",
            },
            cache: "no-store",
        }
    );

    console.log("STATUS:", response.status);

    const text = await response.text();

    console.log("RESPONSE:", text);
    console.log("===========================");

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
        // "/profile/:path*",
        // "/settings/:path*",
        // "/posts/:path*",
    ],
};