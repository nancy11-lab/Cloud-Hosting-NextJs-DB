"use client";
import { JWTPayload } from "@/utils/types";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { useState } from "react";

interface ProfileContainerProps {
  payload: JWTPayload;
}

const ProfileContainer = ({ payload }: ProfileContainerProps) => {
  const [show, setShow] = useState(false);
  const showContainerHandler = () => {
    setShow((prev) => !prev);
  };

  console.log("username from client", payload.username);

  return (
    <>
      <div className="relative px-2 py-1 bg-gray-300">
        <strong
          onClick={showContainerHandler}
          className=" text-blue-800 md:text-xl capitalize cursor-pointer"
        >
          {payload?.username}
        </strong>
        {show && (
          <div className="w-30 h-30 sm:w-50 md:w-60 flex flex-col  justify-center  border-2 rounded-lg border-gray-300 bg-white absolute top-12 right-0 ">
            <Link
              onClick={() => setShow(false)}
              className="w-full py-1 px-3   mb-2  hover:bg-gray-300 transition"
              href="/profile"
            >
              Profile
            </Link>
            <hr className="mb-2 text-gray-300"/>
            <LogoutButton />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileContainer;
