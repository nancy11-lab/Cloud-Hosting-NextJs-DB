import { NextRequest } from "next/server";
import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";


// Verfify Token For Api EndPoint
export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    //get token from cookie
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;

    const privateKey = process.env.JWT_SECRET as string;
    //turn Encoded token into Decoded by fun jwt.verify
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;

    return userPayload;
  } catch (error) {
    return null;
  }
}

// Verfify Token For Page
export function verifyTokenFromPage(token: string): JWTPayload | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    //turn Encoded token into Decoded by fun jwt.verify
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    if (!userPayload) return null;

    return userPayload;
  } catch (error) {
    return null;
  }
}
