"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
    inputRef.current?.focus();
  }

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.error("Username is required");
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    // console.log("username: " , username,"Email: " , email , "password: " , password);

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`, {
        username,
        email,
        password,
      });
      router.replace("/");
      setLoading(false);
      router.refresh();

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
        name="user-name"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded p-2 text-xl border-gray-200 focus-within:outline-blue-600 "
      />
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2 text-xl border-gray-200 focus-within:outline-blue-600"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          ref={inputRef}
          onBlur={() => setShowPassword(false)}
          name="pass"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pr-10 border rounded p-2 text-xl border-gray-200 focus-within:outline-blue-600"
        />
        <button type="button"  onClick={toggleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
          {showPassword ? <FiEye size={20}/> : <FiEyeOff size={20} />}
        </button>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="text-2xl text-white py-3  bg-blue-700 hover:bg-blue-900  cursor-pointer rounded font-semibold transition duration-300"
      >
        {loading ? <ButtonSpinner /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
