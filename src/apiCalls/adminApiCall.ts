import { Comment } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constants";

// Get All Comments
export async function getAllComments(token: string): Promise<Comment[]> {

  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Faild to fetch data");
  }

  return response.json();
}
