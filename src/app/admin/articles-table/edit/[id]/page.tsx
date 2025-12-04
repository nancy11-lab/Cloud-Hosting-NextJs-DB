import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { Article } from "@/generated/prisma";
import { verifyTokenFromPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "./EditArticleForm";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenFromPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const article: Article = await getSingleArticle(id);

  return (
    <section className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-300 rounded w-full">
        <h2 className="text-2xl text-green-700 font-semibold mb-4">
          Edit Article
        </h2>

        <EditArticleForm article={article} />
        
      </div>
    </section>
  );
};

export default EditArticlePage;
