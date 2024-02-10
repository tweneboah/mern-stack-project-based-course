import axios from "axios";
//create that must return a promise
const BASE_URL = "http://localhost:5000/api/v1/earnings";

//! Fetch all catgories
export const fetchAllEarningsAPI = async () => {
  const posts = await axios.get(BASE_URL);
  return posts.data;
};
