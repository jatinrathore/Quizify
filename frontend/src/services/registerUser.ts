import axios from "axios";
import { UserFormData } from "../models/Signup";

const endpoint = "/api/users";

const registerUser = async (userData: UserFormData) => {
  try {
    const response = await axios.post(endpoint, userData);

    return response.data;
  } catch (error) {
    return error;
  }
};

export default registerUser;
