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
    .nonempty({ message: "username is required" })
    .min(2, { message: "username should be at least 2 characters" })
    .max(100, { message: "username should be less than 100 characters" })
    .refine((val) => /^[a-zA-Z]{2}/.test(val), {
      message: "username must start with at least 2 letters",
    }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .min(3, { message: "Email should be at least 3 characters long" })
    .max(200)
    .email({ message: "invalid email format" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "password must be at least 6 characters" })
    .max(30, { message: "password must be less than 30 characters" })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])/,
      "Password  must be at least 6 character and include a capital letter , a lowercase letter , a number, and spicial character (@, # , $ , etc.)"
    ),
});

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .min(3, { message: "Email should be at least 3 characters long" })
    .max(200)
    .email({ message: "invalid email format" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "password must be at least 6 characters" })
    .max(30, { message: "password must be less than 30 characters" })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])/,
      "Password  must be at least 6 character and include a capital letter , a lowercase letter , a number, and spicial character (@, # , $ , etc.)"
    ),
});

//update user profile schema
export const updateUserSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "username is required" })
    .min(2, { message: "username must be at least 2 characters" })
    .max(100, { message: "username should be less than 100 characters" })
    .refine((val) => /^[a-zA-Z]{2}/.test(val), {
      message: "username must start with at least 2 letters",
    })
    .optional(),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .min(3, { message: "Email should be at least 3 characters long" })
    .max(200)
    .email({ message: "invalid email format" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" })
    .max(30, { message: "password must be less than 30 characters" })
    .optional(),
  image: z.string().nullable().optional(),
});
//update user profile schema in client
const passwordSchema = z
  .string()
  .min(6, { message: "password must be at least 6 characters" })
  .max(30, { message: "password must be less than 30 characters" })
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])/,
    "Password  must be at least 6 character and include a capital letter , a lowercase letter , a number, and spicial character (@, # , $ , etc.)"
  )
  // .or(z.literal(""))
  .optional();

export const updateUserSchemaClient = z
  .object({
    username: z
      .string()
      .nonempty({ message: "username is required" })
      .min(2, { message: "username must be at least 2 characters" })
      .max(100, { message: "username should be less than 100 characters" })
      .refine((val) => /^[a-zA-Z]{2}/.test(val), {
        message: "username must start with at least 2 letters",
      })
      .optional(),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .min(3, { message: "Email should be at least 3 characters long" })
      .max(200)
      .email({ message: "invalid email format" })
      .optional(),
    password: passwordSchema,
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password && data.password.trim() !== "") {
      if (!data.confirmPassword || data.confirmPassword.trim() === "") {
        ctx.addIssue({
          path: ["confirmPassword"],
          message: "Confirm password is required",
          code: "custom",
        });
      } else if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          message: "Password and confirm password do not match",
          code: "custom",
        });
      }
    }
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
