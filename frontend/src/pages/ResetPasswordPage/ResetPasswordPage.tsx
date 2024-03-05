import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [inputFields, setInputFields] = useState({
    password: "",
    confirmPassword: "",
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  function validatePassword(password: string) {
    // Regular expression for validating password
    const emailRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return emailRegex.test(password);
  }

  const showErrorAlert = (message: string) => {
    toast.warn(message, {
      style: { backgroundColor: "#F24C3D" },
      toastId: "customId",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!validatePassword(inputFields.password))
      return showErrorAlert(
        "Password should be at least 8 characters, including at least one capital letter and one numeric or special character."
      );

    if (inputFields.password !== inputFields.confirmPassword)
      return showErrorAlert(
        "The password and confirm password fields must match."
      );

    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_QUIZIFY_SERVER_URL
        }api/users/reset-password?token=${token}&id=${id}`,
        {
          password: inputFields.password,
        }
      );

      if (data.response.status === 200) {
        setInputFields({
          password: "",
          confirmPassword: "",
        });
        return toast.info(
          "Password changed successfully. Please close this tab and Login!"
        );
      }
    } catch (error) {
      console.error("Error in reset password component", error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data === "New password must be different!"
      ) {
        showErrorAlert("New password must be different!");
      } else {
        showErrorAlert(
          "Oops! Something went wrong. Please double-check your OTP and try again."
        );
      }
    }
  };
  return (
    <div>
      <Heading>Reset your password</Heading>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          focusBorderColor="pink.400"
          name="password"
          value={inputFields.password}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup>
        <Input
          pr="4.5rem"
          type={confirmShow ? "text" : "password"}
          placeholder="Confirm password"
          focusBorderColor="pink.400"
          name="confirmPassword"
          value={inputFields.confirmPassword}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setConfirmShow(!confirmShow)}
          >
            {confirmShow ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button colorScheme="purple" onClick={handleClick}>
        Reset Password
      </Button>
    </div>
  );
};

export default ResetPasswordPage;
