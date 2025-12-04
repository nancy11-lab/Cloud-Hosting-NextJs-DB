"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.error("Please write something");

    try {
      await axios.post(`${DOMAIN}/api/comments`, { text , articleId });
      router.refresh();
      setText("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        placeholder="Add a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 rounded-lg text-xl  bg-white focus:shadow-md focus-within:outline-none"
      />
      <button
        type="submit"
        className="bg-green-700 text-white mt-2 py-1 px-2 w-min text-xl cursor-pointer rounded-lg hover:bg-green-900 transition duration-300"
      >
        Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
