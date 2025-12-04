
"use client";
import { Article } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFormProps {
    article : Article
}

const EditArticleForm = ({article} : EditArticleFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, { title, description });
      toast.success("Article Updated");
      router.refresh();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
      <input
        type="text"
        name="title-article"
        placeholder="Enter Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 text-xl bg-white border-2 border-gray-200 focus-within:outline-green-600"
      />
      <textarea
        name="des-article"
        rows={5}
        placeholder="Enter article description"
        className="p-2 bg-white lg:text-lg rounded border-2 border-gray-200 focus-within:outline-green-600 resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="text-2xl text-white py-3 bg-green-700 hover:bg-green-900 cursor-pointer rounded  font-semibold transition duration-300"
      >
        Edit
      </button>
    </form>
  );
};

export default EditArticleForm;
