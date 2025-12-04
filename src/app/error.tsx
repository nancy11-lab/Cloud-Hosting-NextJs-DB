"use client";

import Link from "next/link";
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="fix-height  pt-10 flex   items-center flex-col gap-5 px-1 ">
      <h1 className="text-3xl text-red-600 font-semibold text-center">
        Something went wrong.
      </h1>
      <h2 className="text-gray-700 text-xl text-center">
        Error Message: {error.message}
      </h2>
      <button
        onClick={() => reset()}
        className="font-bold text-white bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded-full cursor-pointer"
      >
        Try again
      </button>
      <Link className="text-xl underline text-blue-700 block mt-2" href="/">
        Go To Home Page
      </Link>
    </div>
  );
};

export default ErrorPage;
