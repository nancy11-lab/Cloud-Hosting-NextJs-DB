import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationSchema";
import { cookies } from "next/headers";
import { setCookie } from "@/utils/generateToken";


/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc    Delete User Profile
 * @access private (only user himself can  delete his account)
 */

interface Props {
  params: Promise<{ id: string }>;
}
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });
    //check if user not found
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // if user found i will get token from cookie => call fun verifyToken
    const userFromToken = verifyToken(request);

    // check if user.id (id user from request) === user.id from token(userFromToken) && userFromToken !== null
    if (userFromToken !== null && userFromToken.id === user.id) {
      // deleting the user
      await prisma.user.delete({ where: { id: parseInt(id) } });

      // delete Token
      (await cookies()).delete("jwtToken");

      return NextResponse.json(
        { message: "your profile (account) has been deleted" },
        { status: 200 }
      );
    }
    //if user.id (id user from request) !== user.id from token
    return NextResponse.json(
      { message: "only user himself can delete his profile , forbidden" },
      { status: 403 } // forbidden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route  ~/api/users/profile/:id
 * @desc    Get User Profile
 * @access private (only user himself can  get his account/profile)
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        image:true
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // if user found i will get token from cookie => call fun verifyToken
    const userFromToken = verifyToken(request);
    // if  userFromToken.id !== user.id => (user want to get profile is not owned)
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you not allowed, access denied" },
        { status: 403 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route  ~/api/users/profile/:id
 * @desc    Update User Profile
 * @access private (only user himself can  update his account/profile)
 */

type BodyWithFile = UpdateUserDto & {
  file? : string
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // if user found i will get token from cookie => call fun verifyToken
    const userFromToken = verifyToken(request);
    // if  userFromToken.id !== user.id => (user want to get profile is not owned)
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you not allowed, access denied" },
        { status: 403 }
      );
    }

    // if userFromToken.id === user.id => get data from body
    const body = (await request.json()) as BodyWithFile;
    console.log("body from client" , body);
    //لو الباس جايه فاضيه احذغها من body
    if(!body.password || body.password.trim() === ""){
      delete body.password
    }


     //map file 
    if(body.file){
      body.image =body.file;
      delete body.file;
    } 

    const validation = await updateUserSchema.safeParse(body);
    if (!validation.success) {
      const errors = Object.fromEntries(
        validation.error.issues.map((issue) => [issue.path[0], issue.message])
      );
      return NextResponse.json({ errors }, { status: 400 });
    }
    // data from body after validation
    // const dataValidated = validation.data;
    

    // if user want to change password لازم الاول اعمله تشفير قبل ارساله لقاعده البيانات
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

   console.log("updating user with body", body)

    const updateUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username: body.username,
        email: body.email,
        ...(body.password && {password: body.password}),
        ...(body.image !== undefined && {image : body.image})
        // image : body.image ?? user.image
      },
    });
    console.log("username updated img from server" , updateUser.image);
    //you
    // call fun setCookie => set cookie with jwt token
    const cookie = setCookie({
      id: updateUser.id,
      isAdmin: updateUser.isAdmin,
      username: updateUser.username,
    });

    const { password, ...other } = updateUser;
    return NextResponse.json(
      { ...other },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
