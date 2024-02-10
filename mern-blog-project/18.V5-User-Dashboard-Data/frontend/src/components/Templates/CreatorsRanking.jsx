import React from "react";
import { FaTrophy } from "react-icons/fa";

const Rankings = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-6 sm:py-12">
      <div className="w-full sm:max-w-xl mx-auto min-h-screen ">
        <div className="flex flex-col justify-between h-full bg-white shadow-lg rounded-3xl overflow-hidden">
          <div className="px-4 py-10 sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5 mb-6">
                <FaTrophy className="text-yellow-500 text-5xl" />
                <div className="block pl-2 font-semibold text-2xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Top Creators</h2>
                  <p className="text-sm text-gray-500">
                    House of the best creators of all time.
                  </p>
                </div>
              </div>
              {/* <div className="divide-y divide-gray-200">
                {data?.map((ranking, index) => (
                  <div
                    key={index}
                    className="pt-6 pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`text-lg font-bold ${
                          index === 0 ? "text-yellow-500" : "text-gray-500"
                        }`}
                      >
                        {`#${ranking.rank}`}
                      </div>
                      {ranking.user.profilePicture ? (
                        <img
                          src={ranking.user.profilePicture}
                          alt="avatar"
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <Avatar />
                      )}
                      <div className="text-black font-medium">
                        {ranking.user.username}
                      </div>
                      <div className="text-gray-600">
                        {`Posts: ${ranking.user.posts?.length}`}
                      </div>
                      <div className="ml-auto flex items-center space-x-2">
                        <FaDollarSign className="text-green-500 text-xl" />
                        <div className="text-gray-600 font-medium">
                          {ranking.totalAmount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
