import axios from "axios";
import { LoginFormData } from "../models/Login";

const loginUser = async (userData: LoginFormData) => {
  const endpoint = `${import.meta.env.VITE_QUIZIFY_SERVER_URL}api/auth`;

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
