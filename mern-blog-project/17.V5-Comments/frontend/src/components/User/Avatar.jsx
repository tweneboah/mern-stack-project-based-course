import React from "react";
import { AiOutlineUser } from "react-icons/ai";
const Avatar = () => {
  return (
    <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500">
      <span className="sr-only">Open user menu</span>
      <AiOutlineUser className="h-5 w-5 text-gray-400" />
    </button>
  );
};

export default Avatar;
