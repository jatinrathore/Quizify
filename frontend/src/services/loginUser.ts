import axios from "axios";
import { LoginFormData } from "../models/Login";

const loginUser = async (userData: LoginFormData) => {
  const endpoint = `/api/auth`;

  try {
    const { data: res } = await axios.post(endpoint, userData, {
      withCredentials: true, // Enable sending cookies
    });

    return res;
  } catch (error) {
    return error;
  }
};

export default loginUser;
