import ArticleItem from "@/components/articles/ArticleItem";
import Hero from "@/components/home/Hero";
import { Article } from "@/generated/prisma";
import prisma from "@/utils/db";
import { verifyTokenFromPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";

const HomePage = async () => {
  const lastestArticles: Article[] = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenFromPage(token);

  return (
    <section className="fix-height container mx-auto  py-5 px-2">
      <Hero />

      {/* Latest Articles */}
      <section className="px-3 py-4 mt-7 rounded-md bg-white  ">
        <h2 className="text-3xl font-bold text-gray-700 capitalize mt-2 ms-3">
          Latest Articles
        </h2>

        <div className="px-3 py-2 mt-5 flex flex-col gap-5 justify-center md:flex-row">
          {lastestArticles.map((article) => (
            <ArticleItem article={article} key={article.id} />
          ))}
        </div>

        {/* Go-to All  Articles */}
        <div className="mt-6 flex  justify-center">
          <Link
            href="/articles?pageNumber=1"
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
          >
            View all articles
          </Link>
        </div>
      </section>
      {/* call action  */}
      <section className="mt-11 bg-gray-50 rounded-lg p-6">
        {payload ? (
          <div>
            <h3 className="text-2xl font-bold text-purple-500 mb-2">Share Your Thoughts</h3>
            <p className="text-gray-600 text-lg">
              Join the discussion by commenting on articles.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-purple-500 mb-4">Join the Community</h3>
            <p className="text-gray-600 mb-6">
              Create an account or log in to comment on articles and share your
              opinion.
            </p>

            <div className="flex gap-4 ">
              <Link
                href="/register"
                className="px-5 py-2 rounded-md bg-black hover:bg-gray-800 transition-colors text-white text-lg font-medium"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="px-5 py-2 text-white font-bold bg-purple-500 hover:bg-purple-700 transition-colors rounded-md border border-gray-300 text-lg font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </section>

    </section>
  );
};

export default HomePage;
