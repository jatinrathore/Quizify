import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "react-router-dom";
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
import "./SignUpForm.css";

interface Props {
  onSignUpSuccess: () => void;
}

const SignUpForm = ({ onSignUpSuccess }: Props) => {
  //password input state handler
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
  });

  const passwordRequirements =
    "Password should be at least 8 characters, including at least one capital letter and one numeric or special character.";

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
        setFormData({ name: "", email: "", password: "" });
        toast.info("User created successfully, Please Login.");
        onSignUpSuccess();
      }
    } catch (error) {
      console.error("Error during registration", error);
      showErrorAlert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <Text style={{ color: "#45474b", marginBottom: "50px" }}>Sign Up</Text>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="input-fields--box">
          <Stack spacing={5}>
            <Text className="input-fields--heading">
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
        <Box
          className="buttons"
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Button
            colorScheme="orange"
            type="submit"
            marginBottom="1rem"
            isDisabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
            {isLoading && (
              <Spinner
                thickness="2px"
                emptyColor="gray.200"
                size="sm"
                color="orange"
              />
            )}
          </Button>
          {/* Not Working Properly */}
          <Button
            colorScheme="red"
            onClick={() =>
              (window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL)
            }
          >
            Sign up with Google
          </Button>
        </Box>
      </Form>
    </div>
  );
};

export default SignUpForm;
