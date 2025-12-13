import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import prisma from "@/utils/db";
import { SingleArticle } from "@/utils/types";
import { verifyTokenFromPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SingleArticlePageProps {
  params: Promise<{ id: string }>;
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const { id } = await params;
  //   console.log(id);
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenFromPage(token);

  // const article: SingleArticle = await getSingleArticle(id);
  const article = (await prisma.article.findUnique({
    where: { id: parseInt(id) },
    include: {
      comments: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })) as SingleArticle;

  if (!article) {
    notFound();
  }
  // console.log(article.description);

  return (
    <section className="fix-height container mx-auto w-full px-5 pt-8 md:w-3/4 ">
      {/* show single-Article */}
      <div className="bg-white p-7 rounded-lg mb-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-2 capitalize">
          {article.title}
        </h1>
        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>

        <div
          className="text-gray-800 text-xl mt-5 prose prose-lg  [&_h1]:text-blue-700
              [&_h1]:font-extrabold
              [&_h1]:mb-2

              [&_h2]:text-indigo-600
              [&_h2]:font-semibold
              [&_h2]:mt-5
              [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.description}
          </ReactMarkdown>
        </div>
      </div>
      {/* comments-for singleArticle page */}
      <div>
        {payload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="text-blue-700 md:text-xl">
            To write a comment you should log in first
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
      ))}
    </section>
  );
};

export default SingleArticlePage;
