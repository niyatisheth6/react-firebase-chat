import { object, string } from "yup";

export const loginValidationSchema = object({
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


export const signupValidationSchema = object({
  username: string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: string()
    .email("Invalid email")
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
