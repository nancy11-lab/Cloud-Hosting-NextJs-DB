import { KeyboardEvent, useState } from "react";
import { toast } from "react-toastify";

export const useTagsInput = (initialTags: string[] = []) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [categoryInput, setCategoryInput] = useState("");

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (trimmed.length < 4) {
      toast.error("category must be at least 4 characters");
      return;
    }
    if (!/^[A-Za-z]/.test(trimmed)) {
      toast.error("category must start with a letter");
      return;
    }
     if (tags.includes(trimmed)) {
      toast.error("category ");
      return;
    }
    if (!tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setCategoryInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(categoryInput);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return {
    tags,
    categoryInput,
    setCategoryInput,
    handleKeyDown,
    removeTag,
    addTag,
    setTags
  };
};
