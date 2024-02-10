import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "react-quill/dist/quill.snow.css";
import { FaTimesCircle } from "react-icons/fa";

import { useMutation, useQuery } from "@tanstack/react-query";

import AlertMessage from "../Alert/AlertMessage";
import { uplaodProfilePicAPI } from "../../APIServices/users/usersAPI";

const UploadProfilePic = () => {
  // state for wysiwg

  //File upload state
  const [imageError, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // post mutation
  const mutation = useMutation({
    mutationKey: ["upload-profile-pic"],
    mutationFn: uplaodProfilePicAPI,
  });
  const formik = useFormik({
    // initial data
    initialValues: {
      image: "",
    },
    // validation
    validationSchema: Yup.object({
      image: Yup.string().required("image is required"),
    }),
    // submit
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("image", values.image);

      mutation.mutate(formData);
    },
  });

  console.log(mutation);
  //!===== File upload logics====
  //! Handle fileChange
  const handleFileChange = (event) => {
    //get the file selected
    const file = event.currentTarget.files[0];
    //Limit file size
    if (file.size > 1048576) {
      setImageErr("File size exceed 1MB");
      return;
    }
    // limit the file types
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageErr("Invalid file type");
    }
    //set the image preview
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };
  //!remove image
  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };
  //get loading state
  const isLoading = mutation.isPending;
  //isErr
  const isError = mutation.isError;
  //success
  const isSuccess = mutation.isSuccess;
  //Error
  const errorMsg = mutation?.error?.response?.data?.message;

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Upload Profile Picture
        </h2>
        {/* show alert */}

        {isLoading && (
          <AlertMessage type="loading" message="Loading please wait" />
        )}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Profile image has been upddated successfully"
          />
        )}
        {isError && <AlertMessage type="error" message={errorMsg} />}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image Upload Input - File input for uploading images */}
          <div className="flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <div className="flex justify-center items-center w-full">
              <input
                id="images"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              >
                Choose a file
              </label>
            </div>
            {/* Display error message */}
            {formik.touched.image && formik.errors.image && (
              <p className="text-sm text-red-600">{formik.errors.image}</p>
            )}

            {/* error message */}
            {imageError && <p className="text-sm text-red-600">{imageError}</p>}

            {/* Preview image */}

            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full"
                />
                <button
                  onClick={removeImage}
                  className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button - Button to submit the form */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload Profile Picture
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProfilePic;
