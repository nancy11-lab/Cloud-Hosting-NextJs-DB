

"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ArticleFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    params.set("pageNumber" , "1");
    if(selected === "all"){
        params.delete("category")
    }else{
        params.set("category" , selected)
    }

     router.push(`/articles?${params.toString()}`);

  };

  return (
    <select
      value={currentCategory}
      onChange={handleChange}
      className="border-2 border-gray-300 rounded p-2 outline-none w-full text-base sm:text-lg "
    >
      <option value="all">All Articles</option>
      <option value="frontend">Frontend</option>
      <option value="backend">Backend</option>
      <option value="database">Database</option>
      <option value="backend-tools">Backend Tools</option>
    </select>
  );
};

export default ArticleFilter;