// import { NextRequest, NextResponse } from "next/server";

// export function proxy(request: NextRequest) {
//   // console.log("middleware is called");

//   // if user found i will get token from cookie
//   const jwtToken = request.cookies.get("jwtToken");
//   const token = jwtToken?.value as string;
//   // check if token or no
//   if (!token) {
//     if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
//       return NextResponse.json(
//         { message: "not token provided , access denied , message from proxy" },
//         { status: 401 } // Unauthorized
//       );
//     }
//   } else {
//     if (
//       request.nextUrl.pathname === "/login" ||
//       request.nextUrl.pathname === "/register"
//     ) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }
// }

// export const config = {
//   matcher: ["/api/users/profile/:path*", "/login", "/register"],
// };

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";
import prisma from "./utils/db";


export async function proxy(request: NextRequest) {
  // check if token exists in cookies
  const userFromToken = verifyToken(request);

  // لو مفيش توكن أو التوكن غير صالح
  if (!userFromToken) {
    // لو المستخدم راح profile API
    if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
      return NextResponse.json(
        { message: "No token provided, access denied" },
        { status: 401 }
      );
    }

    // مسح الكوكي لو موجود
    const res = NextResponse.next();
    res.cookies.delete("jwtToken");
    return res;
  }

  // تحقق من وجود المستخدم في DB
  const user = await prisma.user.findUnique({
    where: { id: userFromToken.id },
  });

  if (!user) {
    const res = NextResponse.next();
    res.cookies.delete("jwtToken");
    return res;
  }

  // منع الوصول لل login/register لو المستخدم مسجل دخول
  if (["/login", "/register"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // لو كل حاجة تمام
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"],
};