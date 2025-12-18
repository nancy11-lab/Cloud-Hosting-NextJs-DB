"use client";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import { User } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constants";

interface ProfileContainerProps {
  userId: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProfileContainer = ({ userId }: ProfileContainerProps) => {
  const [show, setShow] = useState(false);
  const showContainerHandler = () => {
    setShow((prev) => !prev);
  };

  const { data: user } = useSWR<User>(
    `${DOMAIN}/api/users/profile/${userId}`,
    fetcher
  );

  if(!user){
    return null
  }

  // console.log("username from client", payload.username);

  return (
    <>
      <div className="relative px-2 py-1 bg-gray-300">
        <strong
          onClick={showContainerHandler}
          className=" text-blue-800 md:text-xl capitalize cursor-pointer"
        >
          {user?.username}
        </strong>
        {show && (
          <div className="w-40 py-2 sm:w-50 md:w-60  flex flex-col  justify-center  border-2 rounded-lg border-gray-300 bg-white absolute z-101 top-12 right-0 ">
            <span
              onClick={() => setShow(false)}
              className="w-7 h-7 mb-1 mr-2 bg-gray-300 rounded-full text-xl font-bold text-red-500 hover:text-red-800 transition-colors cursor-pointer flex items-center justify-center self-end"
            >
              <IoMdClose />
            </span>
            <Link
              onClick={() => setShow(false)}
              className="w-full py-1 px-3   mb-2 text-gray-600 hover:text-gray-950  hover:bg-gray-300 transition-colors"
              href="/profile"
            >
              Profile
            </Link>
            <hr className="mb-2 text-gray-300" />
            <LogoutButton />
          </div>
        )}
      </div>

      <Link
        href="/profile"
        className="relative z-0 flex items-center justify-center w-15 h-15  border-2 border-white  rounded-full bg-linear-65 from-purple-500 to-pink-500 shadow-sm overflow-hidden"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt="profile"
            className="object-cover"
            fill
            sizes="60px"
            priority
          />
        ) : (
          <span className="font-bold text-2xl text-white capitalize">
            {user.username.slice(0, 1)}
          </span>
        )}
      </Link>
    </>
  );
};

export default ProfileContainer;
