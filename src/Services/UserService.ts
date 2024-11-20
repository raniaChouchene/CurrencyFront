import axios from "axios";

import { User } from "../Types/User";
import { endpoint } from "../constants";

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${endpoint}/users/login`, {
      email,
      password,
    });
    return { token: data.token, roles: data.roles, UserName: data.name };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (formData: User) => {
  try {
    const response = await axios.post(`${endpoint}/users/register`, formData);
    return response.data;
  } catch (error) {
    console.error("Error when adding user:", error);
    throw error;
  }
};
