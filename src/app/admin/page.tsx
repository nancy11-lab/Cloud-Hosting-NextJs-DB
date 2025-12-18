
import AddArticleForm from "./AddArticleForm";

const AdminPage =  () => {
  

  return (
    <div className="fix-height flex items-center justifiy-center px-3 sm:px-5 lg:px-20">
      <div className="shadow bg-purple-300 py-4 px-2 sm:px-4 rounded w-full ">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticleForm />
      </div>
    </div>
  );
};

export default AdminPage;
