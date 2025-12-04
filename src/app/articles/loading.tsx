const articlesSkeleton = [1, 2, 3, 4, 5, 6];
const AtriclesLoading = () => {
  return (
    <section className="fix-height container m-auto p-5 animate-pulse">
      {/* search */}
      <div className="my-5 w-full md:w-2/3 m-auto rounded bg-gray-300 h-12 "></div>
      {/* articles */}
      <div className="flex flex-wrap gap-7 items-center justify-center ">
        {articlesSkeleton.map((item) => (
          <div
            className="py-3 px-5 rounded-lg  bg-gray-300  w-full md:w-2/5 lg:w-1/4 flex flex-col justify-between"
            key={item}
          >
            <div className="my-2">
              <h3 className="bg-gray-400 h-6"></h3>
              <p className="mt-2 bg-gray-400 h-14 "></p>
            </div>
            <div className=" bg-gray-500  w-full block  p-1 rounded-lg h-8"></div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 mb-10">
        <div className="bg-gray-400  w-60 rounded-sm h-9"></div>
      </div>
    </section>
  );
};

export default AtriclesLoading;
