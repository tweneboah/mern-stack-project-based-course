import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiLockPasswordLine } from "react-icons/ri";

// Validation schema using Yup
const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-orange-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Reset Your Password
        </h2>
        <form className="mt-4">
          <label htmlFor="password" className="block text-gray-700">
            password:
          </label>
          <div className="flex items-center border rounded-md focus:outline-none focus:ring focus:border-orange-300">
            <RiLockPasswordLine className="mx-2 text-orange-500" />
            <input
              type="password"
              id="password"
              // {...formik.getFieldProps("password")}
              className="w-full px-3 py-2 mt-2 border-0 rounded-md"
            />
          </div>
          {/* {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )} */}
          <button
            type="submit"
            className="w-full px-3 py-2 mt-4 text-white bg-orange-600 rounded-md focus:bg-orange-700 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
