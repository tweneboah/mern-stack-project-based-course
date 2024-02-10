import React from "react";
const Notifications = () => {
  return (
    <div className="flex justify-center items-start  h-screen bg-gray-100">
      <div className="max-w-md w-full mt-5 bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-800 p-4 text-white text-lg font-semibold rounded-t-lg">
          Notifications
        </div>
        <div className="max-h-96 mt-3 overflow-auto">
          {/* {unreadNotifications?.length === 0 ? (
            <p className="text-center text-gray-600 py-4">
              No new notifications
            </p>
          ) : (
            unreadNotifications?.map((notification) => (
              <Link key={notification.id} to={`/posts/${notification?.postId}`}>
                <div className="border-b cursor-pointer border-gray-200 px-4 py-3 hover:bg-gray-50 transition duration-300 ease-in-out">
                  <p className="text-sm text-gray-800 font-medium">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
