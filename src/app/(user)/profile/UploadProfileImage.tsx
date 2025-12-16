"use client";
import { User } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

interface UploadProfileImageProps {
  userId: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const UploadProfileImage = ({ userId }: UploadProfileImageProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: user, mutate } = useSWR<User>(
    `${DOMAIN}/api/users/profile/${userId}`,
    fetcher
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("upload_preset", "profile_images");
      const preset : string = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      formData.append("upload_preset", preset);
      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = cloudRes.data.secure_url; // ده الرابط الي هحطه في DB

      // حدث الـ user في DB
      await axios.put(`${DOMAIN}/api/users/profile/${userId}`, {
        image: imageUrl,
      });
      mutate();
      router.refresh();
      toast.success("Profile image updated successfully");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("error uploading image", error);
      toast.error(error?.response?.data.message);
    }
  };
  const removeImageHandler = async () => {
    try {
      await axios.put(`${DOMAIN}/api/users/profile/${userId}`, {
        image: null,
      });

      toast.success("Image removed");
      router.refresh();
      mutate();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("error removing image", error);
      toast.error(error?.response?.data.message || "Error removing image");
    }
  };
  if (!user) return <p>Loading...</p>;
  console.log("user img:", user.image);
  return (
    <div className="w-4/12 flex flex-col gap-2 items-center  bg-red-300">
      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleImageChange}
      />
      {/* upload-image--button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center cursor-pointer w-15 h-15  border-2 border-white  rounded-full bg-linear-65 from-purple-500 to-pink-500 shadow-sm"
      >
        {user?.image ? (
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={user.image}
              alt="profile"
              fill
              className=" object-cover"
              sizes="60px"
            />
          </div>
        ) : (
          <span className="font-bold text-2xl text-white capitalize">
            {user.username.slice(0, 1)}
          </span>
        )}
      </button>
      {/* remove-image-Profile */}
      {user.image && (
        <button
          onClick={removeImageHandler}
          className="px-2 py-1 cursor-pointer rounded-lg font-bold text-white bg-gray-500 border-1 border-gray-400"
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default UploadProfileImage;
