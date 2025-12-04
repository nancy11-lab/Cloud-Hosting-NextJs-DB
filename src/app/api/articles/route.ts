import { Article } from "@/generated/prisma";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { CreateArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @method GET
 * @route ~/api/articles
 * @desc Get  Articles By Page Number
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    // console.log(pageNumber);
    
    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy : {createdAt : "desc"}
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 *
 * @method POST
 * @route ~/api/articles
 * @desc Create New Article
 * @access private (only admin can create article)
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if(user === null || user.isAdmin === false){
      return NextResponse.json(
        {message : "only admin , access denied"},
        {status : 403}
      )
    }
    const body = (await request.json()) as CreateArticleDto;
     console.log("body recived",body);

    if (typeof body.title !== "string") {
      return NextResponse.json(
        { message: "Title must be a string" },
        { status: 400 }
      );
    }
    if (typeof body.description !== "string") {
      return NextResponse.json(
        { message: "Description must be a string" },
        { status: 400 }
      );
    }

    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues[0].message, {
        status: 400,
      });
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
