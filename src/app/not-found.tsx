import Link from "next/link";


const NotFoundPage = () => {
  return (
    <section className="fix-height flex flex-col items-center justify-center gap-6 ">
      <h1 className="text-8xl text-gray-800 font-bold">404</h1>
      <p className="text-gray-500 text-3xl "> Page Not Found</p>
      <Link className="text-xl underline text-blue-700 capitalize" href="/">Go to home page</Link>
    </section>
  );
};

export default NotFoundPage;
