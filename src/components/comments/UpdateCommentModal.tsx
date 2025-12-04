"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}

const UpdateCommentModal = ({setOpen,text, commentId}: UpdateCommentModalProps) => {
  const [updatedText, setUpdatedText] = useState(text);
  const router = useRouter();

  const FormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedText === "") return toast.info("Please Write Something");

    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedText,
      });
      router.refresh();
      setUpdatedText("");
      setOpen(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/40  flex justify-center items-center">
      {/* Start-Model */}
      <div className=" w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        {/* icon-close */}
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-500 cursor-pointer text-3xl"
          />
        </div>

        <form onSubmit={FormSubmitHandler}>
          <input
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            type="text"
            placeholder="Edit Comment..."
            className="text-xl rounded-lg p-2 w-full bg-white mb-2 border border-gray-200 focus-within:outline-green-600"
          />
          <button
            type="submit"
            className="bg-green-700 text-white w-full mt-2 p-1 text-xl rounded-lg cursor-pointer hover:bg-green-900  transition duration-300 "
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
