import { Article } from "@/generated/prisma";
import Link from "next/link";



interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <div className="py-3 px-5 rounded-lg h-46  border-2 border-gray-400 shadow-lg transition duration-300 ease-in-out hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4 flex flex-col justify-between">
      <div className="">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{article.title}</h3>
        <p className="mt-1 text-lg text-gray-700  line-clamp-1">
          {article.description}
        </p>
      </div>

      <Link
        className="text-xl transition duration-300 ease-in-out bg-purple-600 hover:bg-purple-800 w-full block text-center text-white p-1 rounded-lg"
        href={`/articles/${article.id}`}
      >
        Read More
      </Link>
    </div>
  );
};

export default ArticleItem;
