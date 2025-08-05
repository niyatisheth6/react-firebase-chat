import { useFormik } from "formik";
import { signupValidationSchema } from "../validation";

export const useSignupForm = (onSubmit) => {
  return useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit,
  });
};
