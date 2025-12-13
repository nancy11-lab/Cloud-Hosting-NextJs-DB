const AboutPage = () => {
  //  console.log("called from about page");
  return (
    <section className="fix-height container m-auto px-5 py-7">
      <div className="md:w-3/4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800  mb-6">
          About CloudPosts{" "}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          <strong className="text-purple-700 text-xl">CloudPosts</strong> is a
          modern <strong>web-based platform</strong> designed for tech
          enthusiasts to read, explore, and discuss programming languages,
          frameworks, and development tools. The platform focuses on delivering
          high-quality technical articles in a clean and organized interface
          accessible from any web browser.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          Who Can Use CloudPosts?
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
          <li>
            <strong className="text-blue-700 text-xl">Users</strong>: Anyone can
            browse and read articles freely. Registered users can also leave
            comments and engage in discussions on articles they like.
          </li>
          <li>
            <strong className="text-blue-700 text-xl">Admin</strong>: Only
            administrators can manage the content, including adding new
            articles, editing existing ones, and moderating comments.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
          Key Features
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
          <li>
            <strong>Curated Articles</strong>: Explore a wide range of
            programming languages, frameworks, and development tools with
            detailed explanations and examples.
          </li>
          <li>
            <strong>Interactive Comments</strong>: Engage with the community by
            leaving comments and feedback if you are a registered user.
          </li>
          <li>
            <strong>Clean Interface</strong>: Designed with simplicity and
            readability in mind using modern styling with Tailwind CSS.
          </li>
          <li>
            <strong>Secure Access</strong>: User authentication ensures that
            only registered users can comment and only admins can modify
            content.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          CloudPosts aims to provide a{" "}
          <strong>reliable and engaging learning experience via the web</strong>{" "}
          for developers of all levels. Whether you are a beginner exploring
          programming languages or an experienced developer looking for quick
          references, CloudPosts offers a structured and user-friendly
          experience to enhance your coding journey.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
