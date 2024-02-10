import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";
import { userProfileAPI } from "../../APIServices/users/usersAPI";
import truncateString from "../../utils/truncateString";
import { deletePostAPI } from "../../APIServices/posts/postsAPI";

const DashboardPosts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });
  //delete mutation
  const deletePostMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });
  //handle delete post
  const handlePost = (postId) => {
    deletePostMutation
      .mutateAsync(postId)
      .then(() => {
        //refetch the profile
        refetch();
      })
      .catch((e) => console.log(e));
  };
  const userPosts = data?.user?.posts;
  console.log(userPosts);
  return (
    <section className="py-8">
      {userPosts?.length < 0 ? (
        <div>No posts yet</div>
      ) : (
        <section className="py-8">
          <div className="container px-4 mx-auto">
            <div className="pt-4 bg-white shadow rounded">
              <div className="flex px-6 pb-4 border-b">
                <h3 className="text-xl font-bold">
                  Your Posts ({userPosts?.length})
                </h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 text-left">
                      <th className="pb-3 font-medium">Post</th>
                      <th className="pb-3 font-medium">This Month Earning</th>
                      <th className="pb-3 font-medium">Total Earnings</th>
                      <th className="pb-3 font-medium">Date Created</th>
                      <th className="pb-3 font-medium">
                        Upcoming Earning Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userPosts?.map((post) => {
                      return (
                        <tr className="text-xs bg-gray-50">
                          <td className="py-5 px-6 font-medium flex items-center space-x-2">
                            <img
                              src={post?.image?.path}
                              className="w-10 h-10 object-cover rounded-full"
                            />
                            <div>
                              {truncateString(
                                htmlToText(post?.description),
                                10
                              )}
                            </div>
                          </td>
                          <td className="font-medium">
                            $ {post?.thisMonthEarnings || 0}
                          </td>
                          <td className="font-medium">
                            $ {post?.totalEarnings || 0}
                          </td>
                          <td className="font-medium">
                            {new Date(post.createdAt).toDateString()}
                          </td>
                          <td>
                            <span className="inline-block py-1 px-2 text-white bg-green-500 rounded-full">
                              {new Date(post.nextEarningDate).toDateString()}
                            </span>
                          </td>
                          <td className="flex items-center mb-10 space-x-2">
                            <Link to={`/dashboard/update-post/${post._id}`}>
                              <FiEdit className="text-green-500 cursor-pointer" />
                            </Link>
                            <button onClick={() => handlePost(post._id)}>
                              <FiTrash2 className="text-red-500 cursor-pointer" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default DashboardPosts;
