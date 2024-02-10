import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaGift } from "react-icons/fa";
import { freePlanAPI } from "../../../APIServices/stripe/plans";

const PayingFreePlan = () => {
  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["free-plan"],
    queryFn: freePlanAPI,
  });
  console.log(data);
  alert("h");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="p-8 bg-white rounded shadow-md w-80">
        <FaGift className="w-16 h-16 mx-auto text-green-500" />
        {/* show loading */}

        <h2 className="mt-6 text-2xl font-semibold text-center text-green-700">
          Free Plan Activation
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Proceed to activate your free plan.
        </p>
        <button
          // onClick={handleSubscribeToFreePlan}
          className="mt-8 w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
        >
          Activate Free Plan
        </button>
      </div>
    </div>
  );
};

export default PayingFreePlan;
