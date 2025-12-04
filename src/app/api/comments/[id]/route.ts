import prisma from "@/utils/db";
import { UpdateCommentDto } from "@/utils/dtos";
import { updateCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 *
 * @method PUT
 * @route ~/api/comments/:id
 * @desc Update  comment
 * @access private (only owner of the comment)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    // if comment found
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "you are not allowed , access denied" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as UpdateCommentDto;
    const validation = updateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const dataValidated = validation.data;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        text: dataValidated.text,
      },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 *
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc Delete  comment
 * @access private (only admin or owner of the comment)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: "no token provided , access denied" },
        { status: 401 }
      );
    }
    //if user owner this comment or admin  can you delete
    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({
        where: { id: parseInt(id) },
      });

      return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
    }
    // if user logged in but no admin and not owner this comment
    return NextResponse.json(
      { message: "you are not allowed , access denied" },
      { status: 403 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
