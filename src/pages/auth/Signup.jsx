import { useState } from "react";

import { useSignupForm } from "../../hooks/useSignupForm";

import AvatarImg from "../../assets/img/avatar.png";
import Edit from "../../assets/img/edit.png";

function Signup() {
  const [avatar, setAvatar] = useState({ file: null, url: "" });
  const [isLoading, setIsLoading]= useState(false)

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const formik = useSignupForm(avatar, setIsLoading);

  return (
    <div className="flex-1 flex flex-col items-center gap-5">
      <h2 className="text-2xl font-semibold">Create an account</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center justify-center gap-5 w-full max-w-sm"
      >
        <div>
          <label htmlFor="file" className="w-full flex cursor-pointer relative">
            <img
              src={avatar.url || AvatarImg}
              alt="avatar"
              className="w-[100px] h-[100px] rounded-full object-cover opacity-60"
            />
            <span className="bg-black w-10 h-10 flex justify-center items-center rounded-full absolute bottom-0 right-0">
              <img src={Edit} className="w-5 h-5" />
            </span>
          </label>
        </div>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleAvatar}
        />

        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="p-4 border-none outline-none !bg-black text-white rounded-[.625rem] w-full"
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-500 text-sm w-full">
            {formik.errors.username}
          </div>
        )}

        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="p-4 border-none outline-none !bg-black text-white rounded-[.625rem] w-full"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm w-full">
            {formik.errors.email}
          </div>
        )}

        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="p-4 border-none outline-none !bg-black text-white rounded-[.625rem] w-full"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm w-full">
            {formik.errors.password}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-4 border-none bg-blue-800 rounded-[.625rem] hover:bg-blue-900 text-white font-medium  disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
