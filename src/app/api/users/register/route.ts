import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { setCookie } from "@/utils/generateToken";


/**
 *
 * @method POST
 * @route ~/api/users/register
 * @desc Create New User [(Register) (Sign Up)]
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (user) {
      return NextResponse.json(
        { message: " This user already registered" },
        { status: 400 }
      );
    }

    // incrypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // if user ملهوش حساب
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        isAdmin: true,
        id: true,
      },
    });

    // call fun setCookie => set cookie with jwt token
    const cookie = setCookie({
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    });

    return NextResponse.json(
      { ...newUser  , message : "Registered & Authanticated"},
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
