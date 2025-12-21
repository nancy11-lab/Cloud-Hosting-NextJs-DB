import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@/generated/prisma";

import type { Metadata } from "next";
import prisma from "@/utils/db";
import ArticleFilter from "@/components/articles/ArticleFilter";
interface ArticlePageProps {
  searchParams: Promise<{ pageNumber: string , category?: string }>;
}



const AreticlesPage = async ({ searchParams }: ArticlePageProps) => {
  // delay 3S before fetching Data
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const { pageNumber , category} = await searchParams;


  const articles: Article[] = await getArticles(pageNumber , category);
  const count: number = await getArticlesCount(category);
  // const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="fix-height container m-auto px-5 py-2 ">
      <SearchArticleInput />

      {/* filteration-component */}
      <div className="relative  mt-2 mb-13 w-full max-w-md mx-auto overflow-hidden ">
        <ArticleFilter />
      </div>


      <div className="flex flex-wrap gap-7 items-center justify-center ">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        category={category}
        pages={pages}
        route="/articles"
      />
    </section>
  );
};

export default AreticlesPage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about Programming",
};
