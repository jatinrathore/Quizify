import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyEmailPage = () => {
  const [OTP, setOTP] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
  };

  //Helper methods
  function isNumeric(str: string) {
    return /^\d+$/.test(str);
  }

  const showErrorAlert = (message: string) => {
    toast.warn(message, {
      style: { backgroundColor: "#F24C3D" },
      toastId: "customId",
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (OTP.length < 4 || !isNumeric(OTP))
      return showErrorAlert("Invalid OTP entered. Please provide a valid OTP.");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_QUIZIFY_SERVER_URL}api/users/verify-email`,
        {
          userId: id,
          otp: OTP,
        }
      );

      if (data.response.status === 200) {
        setOTP("");
        navigate("/");
        return toast.info(
          "Your email has been successfully verified. Please login."
        );
      }
    } catch (error) {
      console.error("Error during verification", error);
      showErrorAlert(
        "Oops! Something went wrong. Please double-check your OTP and try again."
      );
    }
  };

  return (
    <>
      <NavBar />
      <div className="email-verify-container">
        <Text>An OTP is sent to your Email</Text>
        <Input
          focusBorderColor="pink.400"
          placeholder="Enter your OTP"
          onChange={handleChange}
          value={OTP}
        />
        <Button colorScheme="purple" onClick={handleSubmit}>
          Verify
        </Button>
      </div>
    </>
  );
};

export default VerifyEmailPage;
