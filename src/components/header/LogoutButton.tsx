"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CiLogin } from "react-icons/ci";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div
      onClick={logoutHandler}
      className="flex justify-between items-center py-1 px-3 text-gray-600 hover:text-gray-950 text-left cursor-pointer  hover:bg-gray-300 transition-colors"
    >
      Log out
      <CiLogin size={20}/>
    </div>
  );
};

export default LogoutButton;
