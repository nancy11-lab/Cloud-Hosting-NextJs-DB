import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { Article } from "@/generated/prisma";
import EditArticleForm from "./EditArticleForm";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {
  const { id } = await params;

  const article: Article = await getSingleArticle(id);

  return (
    <section className="fix-height flex items-center justify-center px-3 sm:px-5 lg:px-20">
      <div className="shadow py-4 px-2 sm:px-4 bg-purple-300 rounded w-full">
        <h2 className="text-2xl text-green-700 font-semibold mb-4">
          Edit Article
        </h2>

        <EditArticleForm article={article} />
        
      </div>
    </section>
  );
};

export default EditArticlePage;
