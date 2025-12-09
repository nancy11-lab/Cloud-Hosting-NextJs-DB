import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import Pagination from "@/components/articles/Pagination";
import { Article } from "@/generated/prisma";
import { ARTICLE_PER_PAGE } from "@/utils/constants";

import Link from "next/link";

import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/utils/db";

interface AdminArticlesTableProps {
  searchParams: Promise<{ pageNumber: string }>;
}
const AdminArticlesTable = async ({ searchParams,}: AdminArticlesTableProps) => {
  const { pageNumber } = await searchParams;

 
  // send request to get Articles
  const articles: Article[] = await getArticles(pageNumber);
  // send request to get count of articles in db
  // const count: number = await getArticlesCount();
  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="p-5 ">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <table className="table w-full text-left ">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl ">
          <tr>
            <th className="p-1 lg:p-2 ">Title</th>
            <th className="hidden lg:inline-block p-1 lg:p-2">
              Created At
            </th>
            <th className="">Actions</th>
            <th className="hidden lg:inline-block "></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t border-b border-gray-300 ">
              <td className="p-3 text-gray-700">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-700 p-3 text-normal">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-3">
                {/* end point not work */}
                <Link
                  href={`/admin/articles-table/edit/${article.id}`}
                  className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center  me-2 lg:me-3 hover:bg-green-800  transition duration-300 cursor-pointer"
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id}/>
              </td>
              <td className="hidden lg:inline-block p-3">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800 transition duration-300 cursor-pointer"
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-7">
        <Pagination pages={pages} route="/admin/articles-table" pageNumber={parseInt(pageNumber)}/>
      </div>
    </section>
  );
};

export default AdminArticlesTable;
