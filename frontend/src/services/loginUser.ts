import axios, { AxiosError } from "axios";
import { LoginFormData } from "../models/Login";
import { LocalStorageAuth } from "../hooks/useAuth";

const loginUser = async (userData: LoginFormData) => {
  const endpoint = `http://localhost:3000/api/auth`;

  try {
    const { data: res } = await axios.post(endpoint, userData);
    localStorage.setItem(
      LocalStorageAuth.QUIZIFY_TOKEN,
      JSON.stringify(res.data)
    );

    return res.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      // Check if the response exists and has data property
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      } else {
        // Handle other AxiosError cases
        return axiosError.message;
      }
    } else {
      // Handle other types of errors
      return (error as Error).message;
    }
  }
};

export default loginUser;
