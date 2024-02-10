import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
//!Create instance of client
const queryClient = new QueryClient();
//configure stripe
const stripePromise = loadStripe(
  "pk_test_51OQg20JXBXfwZ3rJg9PPyFnREVLx4b06Ve9YropmUxa3vtHOVs8JzaxFZdNCaNCail7D0LafSz6OqqfeKAGDCN6900cv3YIPjP"
);

//stripe options
const options = {
  mode: "payment",
  currency: "usd",
  amount: 1099,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
