import React from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-5xl lg:text-6xl font-bold font-heading mb-6">
          Pricing
        </h1>
        <p className="text-gray-600 text-lg text-center mb-10 max-w-lg mx-auto">
          Simple pricing that fits for everyone for the price of a cup of
          coffee.Start for free, no credit card required.
        </p>

        <div className="flex flex-wrap mb-24 -mx-4">
          {/* Free Plan */}
          <div className="w-full lg:w-1/2 p-4">
            <div className="border border-gray-200 rounded-3xl px-8 lg:px-10 pb-14 pt-10 h-full">
              <h2 className="text-3xl font-bold font-heading mb-6">Free</h2>
              <div className="flex items-center gap-4 flex-wrap mb-6">
                <h2 className="text-6xl font-bold font-heading">$ 0.0</h2>
                <p className="text-xl font-medium">per month</p>
              </div>

              <Link
                to="/free-subscription"
                className="h-14 inline-flex items-center justify-center w-full text-center py-4 px-6 rounded-full border border-gray-200 shadow text-sm font-semibold hover:bg-gray-50 focus:ring focus:ring-orange-200 transition duration-200 mb-10"
              >
                <span>Sign up today</span>
              </Link>
              <h2 className="text-lg font-bold font-heading mb-4">
                What you’ll get
              </h2>
              <ul className="flex flex-col gap-4">
                {/* {freePlan?.[0]?.features?.map((feature) => {
                  return (
                    <li key={feature} className="flex gap-4">
                      <div className="w-6 h-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 12C2 6.47692 6.47692 2 12 2C17.5231 2 22 6.47692 22 12C22 17.5231 17.5231 22 12 22C6.47692 22 2 17.5231 2 12ZM15.7026 10.1395C15.7641 10.0575 15.8086 9.96402 15.8335 9.86456C15.8584 9.76511 15.8632 9.66168 15.8475 9.56036C15.8319 9.45904 15.7962 9.36187 15.7424 9.27456C15.6887 9.18725 15.618 9.11157 15.5346 9.05195C15.4512 8.99233 15.3567 8.94999 15.2567 8.92741C15.1567 8.90484 15.0532 8.90248 14.9523 8.92047C14.8514 8.93847 14.755 8.97646 14.669 9.03222C14.583 9.08797 14.5089 9.16036 14.4513 9.24513L11.1323 13.8913L9.46667 12.2256C9.32085 12.0898 9.12798 12.0158 8.9287 12.0193C8.72941 12.0228 8.53927 12.1036 8.39834 12.2445C8.2574 12.3854 8.17667 12.5756 8.17315 12.7748C8.16964 12.9741 8.24361 13.167 8.37949 13.3128L10.6872 15.6205C10.7661 15.6994 10.8613 15.7602 10.9661 15.7986C11.071 15.837 11.1829 15.8522 11.2941 15.843C11.4054 15.8338 11.5133 15.8006 11.6104 15.7455C11.7075 15.6904 11.7914 15.6149 11.8564 15.5241L15.7026 10.1395Z"
                            fill="#FF7100"
                          />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  );
                })} */}
              </ul>
            </div>
          </div>
          {/* Premium plan */}
          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-orange-500 rounded-3xl px-8 lg:px-10 pb-14 pt-10 h-full">
              <h2 className="text-white text-3xl font-bold font-heading mb-6">
                {/* {premiumPlan?.[0]?.planName} */}
                Premium
              </h2>
              <div className="flex items-center gap-4 flex-wrap mb-6">
                <h2 className="text-white text-6xl font-bold font-heading">
                  {/* $ {premiumPlan?.[0]?.price} */}
                  300
                </h2>
                <p className="text-white text-xl font-medium">Life Time</p>
              </div>
              <Link
                className="w-full text-center h-14 py-4 px-6 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 focus:ring focus:ring-orange-200 transition duration-200 mb-8 flex items-center justify-center gap-2"
                to="/premium-subscription"
              >
                <span className="text-sm font-semibold ">Sign up today</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={21}
                  height={20}
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M5.50002 10H15.9167M15.9167 10L10.9167 5M15.9167 10L10.9167 15"
                    stroke="#282828"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <h2 className="text-white text-lg font-bold font-heading mb-4">
                What you’ll get
              </h2>
              <ul className="flex flex-col gap-4">
                {/* {premiumPlan?.[0]?.features?.map((feature) => {
                  return (
                    <li key={feature} className="flex gap-4">
                      <div className="w-6 h-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 12C2 6.47692 6.47692 2 12 2C17.5231 2 22 6.47692 22 12C22 17.5231 17.5231 22 12 22C6.47692 22 2 17.5231 2 12ZM15.7026 10.1395C15.7641 10.0575 15.8086 9.96402 15.8335 9.86456C15.8584 9.76511 15.8632 9.66168 15.8475 9.56036C15.8319 9.45904 15.7962 9.36187 15.7424 9.27456C15.6887 9.18725 15.618 9.11157 15.5346 9.05195C15.4512 8.99233 15.3567 8.94999 15.2567 8.92741C15.1567 8.90484 15.0532 8.90248 14.9523 8.92047C14.8514 8.93847 14.755 8.97646 14.669 9.03222C14.583 9.08797 14.5089 9.16036 14.4513 9.24513L11.1323 13.8913L9.46667 12.2256C9.32085 12.0898 9.12798 12.0158 8.9287 12.0193C8.72941 12.0228 8.53927 12.1036 8.39834 12.2445C8.2574 12.3854 8.17667 12.5756 8.17315 12.7748C8.16964 12.9741 8.24361 13.167 8.37949 13.3128L10.6872 15.6205C10.7661 15.6994 10.8613 15.7602 10.9661 15.7986C11.071 15.837 11.1829 15.8522 11.2941 15.843C11.4054 15.8338 11.5133 15.8006 11.6104 15.7455C11.7075 15.6904 11.7914 15.6149 11.8564 15.5241L15.7026 10.1395Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <span className="text-white">{feature}</span>
                    </li>
                  );
                })} */}
              </ul>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold font-heading text-center mb-20">
          Pricing FAQs
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4">
            <div className="py-12 border-b border-gray-100 h-full">
              <h2 className="text-xl font-bold font-heading mb-2">
                What payment options are there?
              </h2>
              <p className="text-gray-500">
                You can pay by credit card, PayPal, or Stripe.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="py-12 border-b border-gray-100 h-full">
              <h2 className="text-xl font-bold font-heading mb-2">
                Are there a free trial?
              </h2>
              <p className="text-gray-500">
                Yes! We offer trial. Free and no credit card required.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4">
            <div className="py-12 border-b border-gray-100 h-full">
              <h2 className="text-xl font-bold font-heading mb-2">
                What type of pricing plans does Solstice offer?
              </h2>
              <p className="text-gray-500">
                We only offer one-time payment plans. No monthly
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="py-12 border-b border-gray-100 h-full">
              <h2 className="text-xl font-bold font-heading mb-2">
                Is there refund?
              </h2>
              <p className="text-gray-500">No. We don't offer refund.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
