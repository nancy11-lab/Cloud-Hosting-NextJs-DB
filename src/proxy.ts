import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // console.log("middleware is called");

  // if user found i will get token from cookie
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;
  // check if token or no
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
      return NextResponse.json(
        { message: "not token provided , access denied , message from proxy" },
        { status: 401 } // Unauthorized
      );
    }
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"],
};
