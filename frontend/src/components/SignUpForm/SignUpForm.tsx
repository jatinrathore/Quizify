import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { Form, useNavigate } from "react-router-dom";
import { UserFormData, validateSignupInput } from "../../models/Signup";
import {
  Input,
  Button,
  Text,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import registerUser from "../../services/registerUser";
import { toast } from "react-toastify";
import "./signupform.css";

const SignUpForm = () => {
  //password input state handler
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
  });

  const passwordRequirements = "Password Example : Abc@1234";

  const showErrorAlert = (message: string) => {
    toast.warn(message, {
      style: { backgroundColor: "#F24C3D" },
      toastId: "customId",
    });
  };

  //Event handlers - handle input field values on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (errors.name || errors.email || errors.password) setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateSignupInput(formData, {
      abortEarlyProp: true,
    });

    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    setErrors({});
    setLoading(true);

    try {
      const data = await registerUser(formData);

      if (data.response && data.response.status === 409) {
        showErrorAlert(
          "An account with this email address is already registered."
        );
      } else if (data.message && data.message === "Network Error") {
        showErrorAlert("Network error occurred. Please try again later.");
      } else if (data.response && data.response.status === 500) {
        showErrorAlert(
          "Internal server error occurred. Please try again later."
        );
      } else if (data.response && data.response.status === 201) {
        toast.info("User created successfully, Please Verify your Email.");
        navigate(`/verify-email/${data.userId}`);
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.error("Error during registration", error);
      showErrorAlert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-heading">
        <Text>Sign Up</Text>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="signup-input-fields--box">
          <Stack spacing={3}>
            <Text className="signup-input-fields--heading">
              Join Scriptly today! Sign up now to get started.
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaUser />
              </InputLeftElement>
              <Input
                placeholder="Enter name"
                type="text"
                onChange={handleChange}
                value={formData.name}
                name="name"
                className="signup-box-input"
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdEmail size={19} />
              </InputLeftElement>
              <Input
                placeholder="Enter email"
                onChange={handleChange}
                value={formData.email}
                name="email"
                className="signup-box-input"
              />
            </InputGroup>

            <InputGroup size="md">
              <InputLeftElement>
                <FaLock />
              </InputLeftElement>
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="signup-box-input"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {(errors.name || errors.email || errors.password) && (
              <Alert
                status="error"
                maxWidth="26rem"
                padding="5px"
                borderRadius="5px"
                fontSize=".9rem"
              >
                <AlertIcon />
                {errors.password
                  ? passwordRequirements
                  : errors.name
                  ? errors.name
                  : errors.email}
              </Alert>
            )}
          </Stack>
        </div>
        <Box className="signup-buttons">
          <button
            type="submit"
            disabled={isLoading}
            className="signup-custom-button"
          >
            {isLoading ? "Signing up..." : "Sign up"}
            {isLoading && (
              <Spinner
                thickness="2px"
                emptyColor="gray.200"
                size="sm"
                color="voilet"
              />
            )}
          </button>
          <button
            className="signup-custom-button"
            onClick={() =>
              (window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL)
            }
          >
            Sign up with Google
          </button>
        </Box>
      </Form>
    </div>
  );
};

export default SignUpForm;
