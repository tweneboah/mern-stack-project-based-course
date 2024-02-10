import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  return (
    <div className="bg-gray-900 h-screen -mt-4 flex justify-center items-center">
      <form className="w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
        {/* Stripe payment element */}
        <div className="mb-4">{/* <PaymentElement /> */}</div>
        {/* Display loading */}
        {/* {mutation?.isPending && (
          <AlertMessage type="loading" message="Proccessing please wait..." />
        )} */}

        {/* Display success */}
        {/* {mutation?.isError && (
          <AlertMessage
            type="error"
            message={mutation?.error?.response?.data?.message}
          />
        )} */}
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Pay
        </button>
        {/* {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )} */}
      </form>
    </div>
  );
};

export default CheckoutForm;
