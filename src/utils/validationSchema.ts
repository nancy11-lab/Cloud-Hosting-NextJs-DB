
import { z } from "zod";
// create Article Schema
export const createArticleSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(2, { message: "Title should be at least 2 characters" })
    .max(200, { message: "Title should be less than 200 characters" }),

  // description: z.string().min(10),
  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(10, { message: "Description should be at least 10 characters" }),
});

// Register Schema
export const registerSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(100)
    .refine((val) => /^[a-zA-Z]{2}/.test(val), {
      message: "username must start with at least 2 letters",
    }), //.optional(),
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

//update user profile schema
export const updateUserSchema = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters" })
    .max(100, { message: "username should be less than 100 characters" })
     .refine((val) => /^[a-zA-Z]{2}/.test(val), {
      message: "username must start with at least 2 letters",
    })
    .optional(),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .min(3 , { message: "Email should be at least 3 characters long" })
    .max(200)
    .email({ message: "invalid email format" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" })
    .optional(),
});

// create comment schema
export const createCommentSchema = z.object({
  text: z.string().nonempty({ message: "required" }).min(2).max(500),
  articleId: z.number(),
});

// update comment schema
export const updateCommentSchema = z.object({
  text: z.string().nonempty({ message: "required" }).min(2).max(500),
});
