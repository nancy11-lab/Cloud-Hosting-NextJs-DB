
"use client";
import { User } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constants";
import { UpdateUserDto } from "@/utils/dtos";
import {updateUserSchema } from "@/utils/validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditProfileFormProps {
  user: User;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const router = useRouter();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const editFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend : UpdateUserDto= {
        username,
        email
    }
    if(password.trim() !== ""){
        dataToSend.password = password;
    }
     const validation = updateUserSchema.safeParse(dataToSend);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }
    try {
      await axios.put(`${DOMAIN}/api/users/profile/${user.id}`, dataToSend);
      router.replace("/");
      router.refresh();
      setPassword("");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="border-2 border-gray-300 rounded-md p-2 focus-within:outline-purple-400"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-800 transition-colors py-2 font-semibold text-xl rounded-md text-white cursor-pointer"
      >
        Edit
      </button>
    </form>
  );
};

export default EditProfileForm;
