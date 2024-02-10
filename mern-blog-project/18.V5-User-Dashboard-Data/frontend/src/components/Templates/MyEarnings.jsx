import React from "react";
import { FaDollarSign } from "react-icons/fa";

const MyEarnings = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col items-center py-6 bg-gradient-to-r from-green-400 to-blue-500">
          <FaDollarSign className="text-white text-6xl" />
          <h1 className="text-2xl font-bold text-white mt-3">My Earnings</h1>
        </div>
        <ul className="divide-y divide-gray-200">
          {[
            { _id: 1, user: "User1", amount: "$100", date: "2022-01-01" },
            { _id: 2, user: "User2", amount: "$150", date: "2022-01-02" },
          ].map((earning) => (
            <li
              key={earning._id}
              className="p-4 flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium text-gray-800">{earning.user}</span>
              <div className="text-right">
                <span className="text-lg text-gray-800">{earning.amount}</span>
                <span className="block text-sm text-gray-500">
                  {earning.date}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyEarnings;
