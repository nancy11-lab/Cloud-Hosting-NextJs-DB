
import { TiTick } from "react-icons/ti";

const Hero = () => {
  return (
    <>
      <div className="py-7 px-4 mb-3 bg-gray-50 rounded-lg md:w-3/4 md:px-0 md:rounded-none md:bg-transparent">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">CloudPosts</h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover and explore high-quality technical articles with ease.
        </p>
        <ul className=" px-4 text-gray-700 flex flex-col gap-4 text-left md:text-left text-md font-bold">
          <li className="flex  gap-1">
            <TiTick size={25} className="text-green-400" />
            Read articles on programming languages, frameworks, and development
            tools
          </li>
          <li className="flex  gap-1">
            <TiTick size={25} className="text-green-400" />
            Engage with the community by leaving comments (for registered users)
          </li>
          <li className="flex  gap-1">
            <TiTick size={25} className="text-green-400" />
            Enjoy a clean, user-friendly interface for smooth reading
          </li>
        </ul>
      </div>
      {/* What You Will Find */}
      <h2 className="mt-10 text-center md:text-left font-bold text-2xl text-gray-700">
        What You Will Find
      </h2>
      <div className="mt-5 grid gap-6  sm:grid-cols-2  lg:grid-cols-3">
        <div className="px-3 py-2 bg-gray-300 rounded-md">
          <h3 className="text-lg font-bold mb-2 text-purple-500">
            Curated Content
          </h3>
          <p className="text-gray-600 text-sm">
            Well-written articles focused on real-world development topics.
          </p>
        </div>

        <div className="px-3 py-2 bg-gray-300 rounded-md">
          <h3 className="text-lg font-bold mb-2 text-purple-500">
            Developer Community
          </h3>
          <p className="text-gray-600 text-sm">
            Registered users can share thoughts and discuss articles through
            comments.
          </p>
        </div>

        <div className="px-3 py-2 bg-gray-300 rounded-md">
          <h3 className="text-lg font-bold mb-2 text-purple-500">
            Clean Reading Experience
          </h3>
          <p className="text-gray-600 text-sm">
            Minimal design optimized for readability and focus.
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
