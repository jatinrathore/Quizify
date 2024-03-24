import { Image, Input, Stack, Text } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../../assets/forgot-password.gif";
import GitFooter from "../../components/GitFooter";
import { FcGoogle } from "react-icons/fc";
import "./forgotpassword.css";

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
        `${import.meta.env.VITE_QUIZIFY_SERVER_URL}/api/users/forgot-password`,
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
        "Oops! Something went wrong. Please double-check your email and try again."
      );
    }
  };
  return (
    <>
      <NavBar />
      <div className="fp-outer-container">
        <div className="fp-grid">
          <div className="fp-details-box">
            <Text className="fp-box-heading">Forgot Password?</Text>
            <Text className="fp-box-text">
              Enter your email blow to receive password reset instruction.
            </Text>
            <label className="fp-box-label">Email*</label>
            <Input
              focusBorderColor="pink.400"
              placeholder="Abc@1234"
              onChange={handleChange}
              value={emailField}
              type="email"
              className="fp-box-input"
            />
            <Stack className="fp-btn-group" spacing={5}>
              <button onClick={handleClick} className="custom-btn fp-box-btn">
                Submit
              </button>
              <p>or</p>
              <button
                className=" custom-btn fp-google-btn"
                onClick={() =>
                  (window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL)
                }
              >
                <p className="google-btn-text">
                  <FcGoogle size={25} />
                  Sign in with Google
                </p>
              </button>
            </Stack>
          </div>
          <div className="fp-img-box">
            <Image src={img} />
          </div>
        </div>
      </div>
      <GitFooter />
    </>
  );
};

export default ForgotPassword;
