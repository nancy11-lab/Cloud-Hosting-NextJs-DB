"use client";
import { useTagsInput } from "@/hooks/useTagsInput";
import { DOMAIN } from "@/utils/constants";
import { createArticleSchema } from "@/utils/validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { KeyboardEvent, useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {
    tags: categories,
    categoryInput,
    setCategoryInput,
    handleKeyDown,
    removeTag:removeCategory,
    addTag,
    setTags
  } = useTagsInput(); // return array

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = createArticleSchema.safeParse({
      title,
      description,
      categories,
    });
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

   

    try {
      await axios.post(`${DOMAIN}/api/articles`, validation.data);
      setTitle("");
      setDescription("");
      setCategoryInput("");
      setTags([]);
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
      {/* Enter-Category */}
      <div className="flex flex-wrap gap-2 rounded p-2 border-2 border-gray-200 bg-white/30">
        {categories.map((cat) => (
          <div
            key={cat}
            className="flex items-center bg-blue-200 text-blue-900 rounded-full px-2 py-1 gap-2"
          >
            <span>{cat}</span>
            <button
              type="button"
              onClick={() => removeCategory(cat)}
              className="font-bold cursor-pointer text-red-500"
            >
              X
            </button>
          </div>
        ))}

        <input
          type="text"
          name="category-article"
          placeholder="Add Categories (Press Enter or , )"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded p-2 text-xl bg-white border-2 border-gray-200 focus-within:outline-blue-600"
        />
      </div>
      {/* End-Category */}
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
