"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteProfileButtonProps {
  userId: number;
}

const DeleteProfileButton = ({ userId }: DeleteProfileButtonProps) => {
  const router = useRouter();

  const deleteProfileHandler = async () => {
    try {
      if (confirm("You want delete this Account , Are you sure?")) {
        await axios.delete(`${DOMAIN}/api/users/profile/${userId}`);
        router.replace("/");
        router.refresh();
        toast.success("Account deleted");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <button
      onClick={deleteProfileHandler}
      className="bg-red-600 hover:bg-red-800 transition-colors text-white font-bold text-lg md:text-xl cursor-pointer px-4 py-3 rounded-lg "
    >
      Delete Profile
    </button>
  );
};

export default DeleteProfileButton;
