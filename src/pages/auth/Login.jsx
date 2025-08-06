import { useState } from "react";

import { useLoginForm } from "../../hooks/useLoginForm";

function Login() {
    const [isLoading, setIsLoading]= useState(false)

  const formik = useLoginForm(setIsLoading);

  return (
 
      <div className="flex-1 flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold">Welcome back</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-center gap-5 w-full max-w-sm"
        >
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="p-4 border-none outline-none !bg-black text-white rounded-[.625rem] w-full"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm w-full">{formik.errors.email}</div>
          )}

          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="p-4 border-none outline-none !bg-black text-white rounded-[.625rem] w-full"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm w-full">{formik.errors.password}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-4 border-none bg-blue-800 rounded-[.625rem] hover:bg-blue-900 text-white font-medium disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>
      </div>
   
  );
}

export default Login;