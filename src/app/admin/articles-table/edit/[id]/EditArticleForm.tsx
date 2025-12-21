"use client";
import { Article } from "@/generated/prisma";
import { useTagsInput } from "@/hooks/useTagsInput";
import { DOMAIN } from "@/utils/constants";
import { updateArticleSchema } from "@/utils/validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFormProps {
  article: Article;
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const {
    tags: categories,
    categoryInput,
    setCategoryInput,
    handleKeyDown,
    removeTag: removeCategory,
    addTag,
  } = useTagsInput(article.categories || []);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = updateArticleSchema.safeParse({
      title,
      description,
      categories,
    });
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    const dataToSend = {
      title,
      description,
      categories,
    };

    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, dataToSend);
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

      <div className="flex-1 min-w-full sm:min-w-[150px]">
          <input
          type="text"
          name="category-article"
          placeholder="Add Categories (Press Enter or , )"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border rounded p-2 text-lg bg-white border-2 border-gray-200 focus-within:outline-green-600"
        />
      </div>
      </div>
      {/* End-Category */}
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
