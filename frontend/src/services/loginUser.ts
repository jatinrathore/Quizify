import axios from "axios";
import { LoginFormData } from "../models/Login";

const loginUser = async (userData: LoginFormData) => {
  const endpoint = "http://localhost:3000/api/auth";

  try {
    const { data: res } = await axios.post(endpoint, userData);

    localStorage.setItem(import.meta.env.VITE_QUIZIFY_LS_KEY, res.data);

    return res;
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   const axiosError: AxiosError = error;

    //   // Check if the response exists and has data property
    //   if (axiosError.response && axiosError.response.data) {
    //     return axiosError.response.data;
    //   } else {
    //     // Handle other AxiosError cases
    //     return axiosError.message;
    //   }
    // } else {
    //   // Handle other types of errors
    //   return (error as Error).message;
    // }
    return error;
  }
};

export default loginUser;
