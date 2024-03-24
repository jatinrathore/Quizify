import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { Image, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import img from "../../assets/verify-email-otp.gif";
import "./verifyemailpage.css";
import GitFooter from "../../components/GitFooter";

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
        `${import.meta.env.VITE_QUIZIFY_SERVER_URL}/api/users/verify-email`,
        {
          userId: id,
          otp: OTP,
        }
      );

      if (data.response.status === 200) {
        setOTP("");
        navigate("/account-manage");
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
      <div className="ev-outer-container">
        <div className="ev-grid">
          <div className="ev-details-box">
            <Text className="ev-box-heading">Verify your Email!</Text>
            <Text className="ev-box-text">
              Please enter the 4-digit verification code that was sent to your
              phone numberThe code is valid for 60 minutes.
            </Text>

            <label className="ev-box-label">OTP*</label>
            <Input
              focusBorderColor="pink.400"
              placeholder="Enter your OTP"
              onChange={handleChange}
              value={OTP}
              className="ev-box-input"
            />
            <button onClick={handleSubmit} className="ev-custom-btn ">
              Verify
            </button>
          </div>
          <div className="ev-img-box">
            <Image src={img} />
          </div>
        </div>
      </div>
      <GitFooter />
    </>
  );
};

export default VerifyEmailPage;
