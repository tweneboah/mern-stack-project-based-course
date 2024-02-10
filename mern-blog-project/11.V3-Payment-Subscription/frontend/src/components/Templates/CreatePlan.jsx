import React from "react";

const CreatePlan = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        // onSubmit={formik.handleSubmit}
        className="p-6 mt-8 bg-white rounded shadow-md w-80"
      >
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-700">
          Create Plan
        </h2>
        {/* show mesage */}
        {/* error */}

        {/* Type Name Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Type Name:
          </label>
          <select
            id="planName"
            // {...formik.getFieldProps("planName")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
          {/* {formik.touched.planName && formik.errors.planName && (
            <div className="text-red-500 mt-1">{formik.errors.planName}</div>
          )} */}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Features (comma separated):
          </label>
          <input
            type="text"
            id="features"
            // {...formik.getFieldProps("features")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {/* {formik.touched.features && formik.errors.features && (
            <div className="text-red-500 mt-1">{formik.errors.features}</div>
          )} */}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Limitations (comma separated):
          </label>
          <input
            type="text"
            id="limitations"
            // {...formik.getFieldProps("limitations")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {/* {formik.touched.limitations && formik.errors.limitations && (
            <div className="text-red-500 mt-1">{formik.errors.limitations}</div>
          )} */}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Price:
          </label>
          <input
            type="number"
            id="price"
            // {...formik.getFieldProps("price")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          {/* {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 mt-1">{formik.errors.price}</div>
          )} */}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Create Plan
        </button>
      </form>
    </div>
  );
};

export default CreatePlan;
