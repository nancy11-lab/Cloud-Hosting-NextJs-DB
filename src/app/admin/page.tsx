import { cookies } from "next/headers";
import AddArticleForm from "./AddArticleForm";
import { verifyTokenFromPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenFromPage(token);
  if (payload?.isAdmin === false) redirect("/");

  return (
    <div className="fix-height flex items-center justifiy-center px-5 lg:px-20">
      <div className="shadow bg-purple-300 p-4 rounded w-full ">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticleForm />
      </div>
    </div>
  );
};

export default AdminPage;
