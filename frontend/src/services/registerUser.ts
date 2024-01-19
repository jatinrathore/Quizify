import axios, { AxiosError } from "axios";
import { UserFormData } from "../models/Signup";

const endpoint = "http://localhost:3000/api/users";

const registerUser = async (userData: UserFormData) => {
  try {
    const response = await axios.post(endpoint, userData);

    return response.data;
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

export default registerUser;
