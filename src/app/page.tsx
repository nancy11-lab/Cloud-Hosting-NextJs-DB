import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";

const HomePage = () => {
  // console.log("called from home page");
  return (
    <section>
       <div className="py-7 px-4 mx-3 mb-3 bg-gray-50 rounded-lg md:w-3/4 md:px-10 md:rounded-none md:bg-transparent">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">CloudPosts</h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover and explore high-quality technical articles with ease.
        </p>
        <ul className="list-disc px-4 text-gray-700 flex flex-col gap-4 text-left md:text-left text-md font-bold">
          <li>Read articles on programming languages, frameworks, and development tools</li>
          <li>Engage with the community by leaving comments (for registered users)</li>
          <li>Enjoy a clean, user-friendly interface for smooth reading</li>
        </ul>
      </div>
      <Hero />
      <h2 className="text-center mt-10 text-3xl capitalize font-bold">
        choose your web hosting plan
      </h2>
      <div className="container m-auto flex justify-center items-center flex-wrap my-7 md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  );
};

export default HomePage;
