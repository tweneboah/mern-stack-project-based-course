import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaEye,
  FaDollarSign,
  FaUsers,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
  FaCommentDots,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import {
  sendEmailVerificatonTokenAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";
import { getMyEarningsAPI } from "../../APIServices/earnings/earningsAPI";

const AccountSummaryDashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });
  //check if user has email

  const hasEmail = data?.user?.email;
  console.log(data);
  //check if user has plan

  const hasPlan = data?.user?.hasSelectedPlan;

  //check if user has verified account
  const isEmailVerified = data?.user?.isEmailVerified;

  //total followers
  const totalFollowers = data?.user?.followers?.length;

  //total following
  const totalFollowing = data?.user?.following?.length;

  //get user posts

  const userPosts = data?.user?.posts?.length;

  //there is a view count in the post object so calculate the total views

  //initial counters

  let totalViews = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalDislikes = 0;

  //loop through the users posts to update the initial counters

  data?.user?.posts?.forEach((post) => {
    totalViews += post.viewers.length;
    totalLikes += post.likes.length;
    totalDislikes += post.dislikes.length;
    totalComments += post.comments.length;
  });

  const { data: earnings } = useQuery({
    queryKey: ["my-earnings"],
    queryFn: getMyEarningsAPI,
  });

  //Calc total amount
  const totalEarnings = earnings?.reduce((acc, curr) => acc + curr.amount, 0);
  console.log(totalEarnings);
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
      value: userPosts || 0,
      bgColor: "bg-pink-500",
    },
    {
      icon: <FaCommentDots />,
      label: "Comments",
      value: totalComments,
      bgColor: "bg-teal-500",
    },
  ];
  //! Sending email verification token mutation
  const verificationTokenMutation = useMutation({
    mutationKey: ["send-email-verification-token"],
    mutationFn: sendEmailVerificatonTokenAPI,
  });
  //handleSendVerificationEmail
  const handleSendVerificationEmail = async () => {
    verificationTokenMutation.mutate();
  };
  console.log(verificationTokenMutation);
  return (
    <div className="p-4">
      <p
        className="
       font-bold text-2xl text-gray-800 mb-4
      "
      >
        Welcome Back: {data?.user?.username}
      </p>
      {/* display account verification status */}
      {verificationTokenMutation.isPending ? (
        <AlertMessage type="loading" message="Email sending loading..." />
      ) : verificationTokenMutation.isError ? (
        <AlertMessage
          type="error"
          message={
            verificationTokenMutation?.error?.message ||
            verificationTokenMutation?.error?.response?.data?.message
          }
        />
      ) : verificationTokenMutation.isSuccess ? (
        <AlertMessage
          type="success"
          message={verificationTokenMutation?.data?.message}
        />
      ) : null}
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
              onClick={handleSendVerificationEmail}
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
