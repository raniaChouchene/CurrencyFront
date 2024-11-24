import axios from "axios";
import { endpoint } from "../constants";

export const loginUser = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(`${endpoint}/users/login`, {
      username,
      password,
    });
    return { token: data };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const register = async (
  name: string,
  username: string,
  password: string
) => {
  try {
    const user = { name, username, password };
    console.log("Register Payload:", user);

    const response = await axios.post(`${endpoint}/users/register`, user);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error when adding user:", error);

    return {
      success: false,
      message: error.response?.data?.error || "Registration failed",
    };
  }
};
