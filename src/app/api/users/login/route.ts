import prisma from "@/utils/db";
import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { setCookie } from "@/utils/generateToken";

/**
 * @method POST
 * @route ~/api/users/login
 * @desc        [تسجيل الدخول (log in) (Sign in) ] Login User
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues[0].message, {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Email or  Password" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid Email or  Password" },
        { status: 400 }
      );
    }

    // call fun setCookie => set cookie with jwt token
    const cookie = setCookie({
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    });

    return NextResponse.json(
      { message: "Authenticated" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
