
"use client"
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentButtonProps {
  commentId: number;
}

const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
  const router = useRouter();

  const deleteCommentHandler = async () => {
    try {
      if (confirm("You want delete this comment , Are you sure?")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
        router.refresh();
        toast.success("Comment deleted");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div
      onClick={deleteCommentHandler}
      className="text-white bg-red-600 inline-block px-2 py-1 rounded-lg text-center cursor-pointer hover:bg-red-800 transtion duration-300"
    >
      Delete
    </div>
  );
};

export default DeleteCommentButton;
