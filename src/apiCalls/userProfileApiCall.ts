import { User } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constants";


export async function getUserProfile(
  token: string,
  userId: number
): Promise<User> {
  const response = await fetch(`${DOMAIN}/api/users/profile/${userId}`, {
    headers: {
      cookie: `jwtToken=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user profile");
  }

  return response.json();
}

