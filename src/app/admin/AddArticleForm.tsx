"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (title.length < 2) return toast.error("Title should be at least 2 characters");
    if (title.length > 200) return toast.error("Title should be less than 200 characters");
    if (description === "") return toast.error("Description is required");
    if (description.length < 10) return toast.error("Description should be at least 10 characters");

    try {
      await axios.post(`${DOMAIN}/api/articles`, { title, description });
      setTitle("");
      setDescription("");
      toast.success("New article added");
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
        className="border rounded p-2 text-xl bg-white border-2 border-gray-200 focus-within:outline-blue-600"
      />
      <textarea
        name="des-article"
        rows={5}
        placeholder="Enter article description"
        className="p-2 bg-white lg:text-lg rounded border-2 border-gray-200 focus-within:outline-blue-600 resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="text-2xl text-white py-3 bg-blue-700 hover:bg-blue-900 cursor-pointer rounded  font-semibold transition duration-300"
      >
        Add
      </button>
    </form>
  );
};

export default AddArticleForm;
