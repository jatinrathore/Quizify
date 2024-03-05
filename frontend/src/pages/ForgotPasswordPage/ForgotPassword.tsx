import { Button, Heading, Input, Text } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [emailField, setEmailField] = useState("");
  const navigate = useNavigate();

  function validateEmail(email: string) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const showErrorAlert = (message: string) => {
    toast.warn(message, {
      style: { backgroundColor: "#F24C3D" },
      toastId: "customId",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailField(e.target.value);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!validateEmail(emailField))
      return showErrorAlert(
        "The provided email address is invalid. Please enter a valid email address."
      );

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_QUIZIFY_SERVER_URL}api/users/forgot-password`,
        {
          email: emailField,
        }
      );

      if (data.response.status === 200) {
        setEmailField("");
        navigate("/");
        return toast.info(
          "Please check your inbox and follow the instructions provided."
        );
      }
    } catch (error) {
      console.error("Error in forgot password component", error);
      showErrorAlert(
        "Oops! Something went wrong. Please double-check your OTP and try again."
      );
    }
  };
  return (
    <div>
      <NavBar />
      <Heading>Reset Password</Heading>
      <Text>
        Please provide your email address to receive a link for password reset.
      </Text>
      <Input
        focusBorderColor="pink.400"
        placeholder="Enter your email"
        onChange={handleChange}
        value={emailField}
        type="email"
      />
      <Button colorScheme="purple" onClick={handleClick}>
        Send Link
      </Button>
    </div>
  );
};

export default ForgotPassword;
