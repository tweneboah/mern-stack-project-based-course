import axios from "axios";
//create that must return a promise
const BASE_URL = "http://localhost:5000/api/v1/earnings";

//! Fetch all earnings
export const fetchAllEarningsAPI = async () => {
  const posts = await axios.get(BASE_URL);
  return posts.data;
};

//! Fetch all user earnings
export const getMyEarningsAPI = async () => {
  const posts = await axios.get(`${BASE_URL}/my-earnings`, {
    withCredentials: true,
  });
  return posts.data;
};
