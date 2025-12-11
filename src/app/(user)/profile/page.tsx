import { getUserProfile } from "@/apiCalls/userProfileApiCall";
import { User } from "@/generated/prisma";
import { verifyTokenFromPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";
import DeleteProfileButton from "./DeleteProfileButton";


const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;
  if (!token) {
    redirect("/");
  }
  const payload = await verifyTokenFromPage(token);
  if (!payload) redirect("/");
  const user = await getUserProfile(token,payload.id);

  return (
    <section className="fix-height container m-auto px-7 py-2 ">
      <div className="mt-3 border-1 border-gray-300 p-2 rounded-md">
        <h2 className="text-2xl text-gray-950 font-bold px-3  mb-3">
          Username :
          <span className="text-blue-600 font-semibold text-xl">
            {user.username}
          </span>
        </h2>
        <h3 className="text-2xl text-gray-950 font-bold px-3">
          Email :
          <span className="text-blue-600 font-semibold text-xl">
            {user.email}
          </span>
        </h3>
      </div>
      {/* edit-profile */}
      <div className="mt-10 border-1 border-gray-300 px-5 py-5 rounded-md">
        <h2 className="mb-5 text-2xl font-bold text-purple-600 ">
          Edit Profile
        </h2>
       <EditProfileForm user={user}/>
      </div>
      <div className="mt-5 mb-7 flex justify-end ">
       <DeleteProfileButton userId={user.id}/>
      </div>
    </section>
  );
};

export default ProfilePage;
