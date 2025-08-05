import { useFormik } from "formik";
import { loginValidationSchema } from "../validation";

export const useLoginForm = () => {
  return useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit : (values) => {
        console.log(values)
    },
  });
};
