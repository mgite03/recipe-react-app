import axios from "axios";

const ACCOUNTS_URL = "http://localhost:4000/api/users";

export const createAccount = async (account) => {
  try {
    const response = await axios.post(`${ACCOUNTS_URL}/register`, account);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const account = async () => {
  const response = await axios.post(`${ACCOUNTS_URL}/account`);
  return response.data;
};
export const signup = async (credentials) => {
  const response = await axios.post(`${ACCOUNTS_URL}/register`, credentials);
  return response.data;
};

export const loginAccount = async (userData) => {
  try {
    const response = await axios.post(`${ACCOUNTS_URL}/login`, userData);
    console.log("test");
    return response.data;
  } catch (err) {
    console.log("did not work");
  }
};
