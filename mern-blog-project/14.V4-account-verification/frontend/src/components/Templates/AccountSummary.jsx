import React from "react";
import {
  FaEye,
  FaDollarSign,
  FaUsers,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AccountSummaryDashboard = ({}) => {
  //check if user has email

  const hasEmail = false;

  //check if user has plan

  const hasPlan = false;

  //check if user has verified account
  const isEmailVerified = false;

  //total followers
  const totalFollowers = 0;

  //total following
  const totalFollowing = 10;

  //get user posts

  const userPosts = 0;

  //there is a view count in the post object so calculate the total views

  const totalViews = 0;

  //calculate total likes but likes is an array

  const totalLikes = 0;

  //total posts

  //calculate total comments

  const totalComments = 0;

  //calculate total dislikes

  const totalDislikes = 0;

  //total earnings

  const totalEarnings = 0;
  const stats = [
    {
      icon: <FaEye />,
      label: "Views",
      value: totalViews,
      bgColor: "bg-blue-500",
    },
    {
      icon: <FaDollarSign />,
      label: "Earnings",
      value: `$${totalEarnings?.toFixed(2)}`,
      bgColor: "bg-green-500",
    },
    {
      icon: <FaUsers />,
      label: "Followers",
      value: totalFollowers || 0,
      bgColor: "bg-purple-500",
    },
    {
      icon: <FaThumbsUp />,
      label: "Likes",
      value: totalLikes || 0,
      bgColor: "bg-yellow-500",
    },
    {
      icon: <FaThumbsDown />,
      label: "Dislikes",
      value: totalDislikes || 0,
      bgColor: "bg-red-500",
    },
    {
      icon: <FaUsers />,
      label: "Following",
      value: totalFollowing || 0,
      bgColor: "bg-indigo-500",
    },
    {
      icon: <FaFlag />,
      label: "Posts",
      value: userPosts?.length || 0,
      bgColor: "bg-pink-500",
    },
    {
      icon: <FaUsers />,
      label: "Ranking",
      value: "1st",
      bgColor: "bg-teal-500",
    },
  ];

  return (
    <div className="p-4">
      <p
        className="
       font-bold text-2xl text-gray-800 mb-4
      "
      >
        Welcome Back:Masynctech
      </p>
      {/* display account verification status */}
      {/* {mutation.isPending ? (
        <AlertMessage type="loading" message="Loading..." />
      ) : mutation.isError ? (
        <AlertMessage
          type="error"
          message={
            mutation?.error?.message || mutation?.error?.response?.data?.message
          }
        />
      ) : mutation.isSuccess ? (
        <AlertMessage type="success" message={mutation?.data?.message} />
      ) : null} */}
      {!hasPlan && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Plan Selection Required</p>
          <p>
            Please{" "}
            <Link to="/pricing" className="underline text-yellow-800">
              select a plan
            </Link>{" "}
            to continue using our services.
          </p>
        </div>
      )}
      {!isEmailVerified && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Account Verification Needed</p>
          <p>
            Your account is not verified. Please{" "}
            <button
              // onClick={handleSendVerificationEmail}
              className="underline text-red-800"
            >
              verify your account
            </button>{" "}
            for full access.
          </p>
        </div>
      )}
      {!hasEmail && (
        <div
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Email Required</p>
          <p>
            Please{" "}
            <Link to="/add-email" className="underline text-blue-800">
              add an email
            </Link>{" "}
            to your account for important notifications.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} text-white rounded-lg shadow-lg p-6`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <div className="text-xl font-semibold">{stat.value}</div>
                <div className="text-sm">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSummaryDashboard;
