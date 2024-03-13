import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Form, useNavigate } from "react-router-dom";
import { LoginFormData, validateLoginInput } from "../../models/Login";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import loginUser from "../../services/loginUser";
import { toast } from "react-toastify";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./signinform.css";
import { FcGoogle } from "react-icons/fc";

const SigninForm = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [idForVerify, setIdForVerify] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIdForVerify("");
  }, []);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const showErrorAlert = (message: string) => {
    toast.warn(message, {
      style: { backgroundColor: "#F24C3D" },
      toastId: "customId",
    });
  };

  //event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (errors.email || errors.password) setErrors({});
  };

  //handle login form submit
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginInput(formData, {
      abortEarlyProp: false,
    });

    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    setErrors({});

    setLoading(true);

    try {
      const data = await loginUser(formData);

      if (data.response && data.response.status === 404) {
        showErrorAlert(
          "Internal server error occurred. Please try again later."
        );
      } else if (data.response && data.response.status === 401) {
        showErrorAlert("Invalid email or password.");
      } else if (data.response && data.response.status === 403) {
        //setId for verify email link
        setIdForVerify(data.response.data.userId);
        showErrorAlert(
          "Email is not verified. Please verify Email before login."
        );
      } else if (data.response && data.response.status === 500) {
        showErrorAlert(
          "Internal server error occurred. Please try again later."
        );
      } else if (data.message && data.message === "Network Error") {
        showErrorAlert("Network error occurred. Please try again later.");
      } else if (data.response && data.response.status === 200) {
        //on successful data retrieval
        navigate("/home");
        toast.info("Logged in successfully!");
      }
    } catch (error) {
      console.error("Error during login", error);
      showErrorAlert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="heading">
        <Text>Sign In</Text>
      </div>
      <Form onSubmit={handleLogin}>
        <div className="input-fields--box">
          <Stack spacing={5}>
            <Text className="input-fields--heading">
              Welcome to Scriptly! Login to your account.
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdEmail size={19} />
              </InputLeftElement>
              <Input
                placeholder="Enter email"
                onChange={handleChange}
                value={formData.email}
                name="email"
                className="box-input"
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <FaLock />
              </InputLeftElement>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="box-input"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.email && (
              <Alert
                status="error"
                borderRadius="5px"
                fontSize=".9rem"
                padding="5px"
              >
                <AlertIcon />
                {errors.email}
              </Alert>
            )}
            {idForVerify && (
              <Alert status="error" borderRadius="5px" fontSize=".9rem">
                <AlertIcon />
                <Link
                  href={`http://localhost:5173/verify-email/${idForVerify}`}
                >
                  <Flex>
                    {`Verify your email here`}
                    <FaExternalLinkAlt style={{ marginLeft: "5px" }} />
                  </Flex>
                </Link>
              </Alert>
            )}
          </Stack>
        </div>
        <div className="forgot-password-container">
          <Link href="/forgot-password">
            <Text>Forgot Password?</Text>
          </Link>
        </div>
        <Box className="signin-buttons">
          <button className="custom-button" type="submit">
            {isLoading ? "Logging in..." : "Log in"}
            {isLoading && (
              <Spinner
                thickness="2px"
                emptyColor="gray.200"
                size="sm"
                color="violet"
              />
            )}
          </button>
        </Box>
      </Form>
      <button
        className="custom-button"
        onClick={() => {
          window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
        }}
        style={{ width: "100%" }}
      >
        <p className="signin-google-text">
          <FcGoogle size={25} />
          Sign in with Google
        </p>
      </button>
    </div>
  );
};

export default SigninForm;
