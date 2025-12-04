import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";

const HomePage = () => {
  // console.log("called from home page");
  return (
    <section>
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
