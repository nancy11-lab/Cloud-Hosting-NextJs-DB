"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import { User } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constants";
import { UpdateUserDto } from "@/utils/dtos";
import { updateUserSchema } from "@/utils/validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

interface EditProfileFormProps {
  user: User;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const router = useRouter();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
    inputRef.current?.focus();
  };

  const editFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend: UpdateUserDto = {
      username,
      email,
    };
    if (password.trim() !== "") {
      dataToSend.password = password;
    }
    const validation = updateUserSchema.safeParse(dataToSend);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }
    try {
      setLoading(true);
      await axios.put(`${DOMAIN}/api/users/profile/${user.id}`, dataToSend);
      router.replace("/");
      setLoading(false);
      setPassword("");
      router.refresh();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={editFormHandler}
      className="flex flex-col justify-center gap-4"
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="border-2 border-gray-300 rounded-md p-2 focus-within:outline-purple-400"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border-2 border-gray-300 rounded-md p-2 focus-within:outline-purple-400"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          ref={inputRef}
          onBlur={() => setShowPassword(false)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full pr-10 border-2 border-gray-300 rounded-md p-2 focus-within:outline-purple-400"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="text-gray-500 hover:text-gray-700 transition-colors absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </button>
      </div>
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-800 transition-colors py-2 font-semibold text-xl rounded-md text-white cursor-pointer"
      >
        {loading ? <ButtonSpinner /> : "Edit"}
      </button>
    </form>
  );
};

export default EditProfileForm;
