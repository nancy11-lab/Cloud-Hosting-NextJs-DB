"use client";

import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Passwordl is required");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/login`, { email, password });
      router.replace("/");
      setLoading(false);
      router.refresh();
      // router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data.message);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2 text-xl border-gray-200 focus-within:outline-blue-600"
      />
      <input
        type="password"
        name="pass"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2 text-xl border-gray-200 focus-within:outline-blue-600"
      />
      <button
        disabled={loading}
        type="submit"
        className="text-2xl text-white py-3 bg-blue-700 hover:bg-blue-900 transition duration-300 cursor-pointer rounded  font-semibold"
      >
        {loading ? <ButtonSpinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
