import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const cookie = request.headers.get("cookie");

    console.log("PATH:", request.nextUrl.pathname);
    console.log("COOKIE:", cookie);

    try {
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

        const data = await response.text();

        console.log("SESSION STATUS:", response.status);
        console.log("SESSION RESPONSE:", data);

        if (!response.ok) {
            return NextResponse.redirect(
                new URL("/auth/login", request.url)
            );
        }

        return NextResponse.next();
    } catch (error) {
        console.error("SESSION CHECK ERROR:", error);

        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        );
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/settings/:path*",
        "/posts/:path*",
    ],
};