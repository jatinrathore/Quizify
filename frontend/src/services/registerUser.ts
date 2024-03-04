import axios from "axios";
import { UserFormData } from "../models/Signup";

const endpoint = import.meta.env.VITE_QUIZIFY_SERVER_URL + "api/users";
// const endpoint = "http://localhost:3000/api/users";

const registerUser = async (userData: UserFormData) => {
  try {
    const response = await axios.post(endpoint, userData);

    return response.data;
  } catch (error) {
    return error;
  }
};

export default registerUser;
