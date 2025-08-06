import { toast } from "react-toastify";
import { useFormik } from "formik";

import { signupUser } from "../config/auth";

import { signupValidationSchema } from "../validation";

export const useSignupForm = (avatar, setIsLoading) => {
  return useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      try {
        await signupUser(values, avatar);
        toast.success("Signup successful! Please log in.");
        resetForm();
      } catch (error) {
        toast.error("Signup failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });
};
