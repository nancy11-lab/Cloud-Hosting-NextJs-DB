import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="flex items-center justify-center mt-4 mb-10 ">
      {pageNumber === 1 ? (
        <button
          disabled
          className="border border-gray-700 text-gray-400 bg-gray-300 py-1 px-2 font-bold text-xl cursor-not-allowed  "
        >
          Prev
        </button>
      ) : (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="border border-gray-700 text-gray-700 py-1 px-2 font-bold text-xl cursor-pointer hover:bg-gray-300 transition duration-300"
        >
          Prev
        </Link>
      )}

      {pagesArray.map((page) => (
        <Link
          href={`${route}?pageNumber=${page}`}
          className={`${
            pageNumber === page ? "bg-gray-400" : ""
          } border border-gray-700 text-gray-700 py-1 px-2 sm:px-3 font-bold text-xl cursor-pointer hover:bg-gray-300 transition duration-300`}
          key={page}
        >
          {page}
        </Link>
      ))}

      {pageNumber === pages ? (
        <button
          disabled
          className="border border-gray-700 text-gray-400 bg-gray-300 py-1 px-2 font-bold text-xl cursor-not-allowed  "
        >
          Next
        </button>
      ) : (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="border border-gray-700 text-gray-700 py-1 px-2 font-bold text-xl cursor-pointer hover:bg-gray-300 transition duration-300"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
