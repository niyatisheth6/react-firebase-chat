import { toast } from "react-toastify";
import { useFormik } from "formik";

import { loginUser } from "../config/auth";

import { loginValidationSchema } from "../validation";

export const useLoginForm = (setIsLoading) => {
  return useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await loginUser(values);
        toast.success("Signin successful! Please log in.");
      } catch (error) {
        toast.error("Signin failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });
};
