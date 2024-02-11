import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Form, useNavigate } from "react-router-dom";
import { LoginFormData, validateLoginInput } from "../models/Login";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import "./css/Form.css";
import loginUser from "../services/loginUser";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

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

      if (data.message.includes("Internal Server Error")) {
        setLoading(false);

        return toast.warn("Something went wrong!", {
          style: { backgroundColor: "#F24C3D" },
          toastId: "customId",
        });
      }

      if (data.message && data.message.includes("Invalid")) {
        setLoading(false);

        return toast.warn("Invalid Email or Password", {
          style: { backgroundColor: "#F24C3D" },
          toastId: "customId",
        });
      }

      //Redirecting user to home page after successful login
      navigate("/home");
      toast.info("Logged in successfully!");
    } catch (error) {
      console.log("Error during login", error);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <Text style={{ color: "#45474b", marginBottom: "50px" }}>Log In</Text>
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
                className="box__input"
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
                className="box__input"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.email && (
              <Alert status="error" borderRadius="5px" fontSize=".9rem">
                <AlertIcon />
                {errors.email}
              </Alert>
            )}
          </Stack>
        </div>
        <Box
          className="buttons"
          style={{ textAlign: "center", marginTop: "30px" }}
        >
          <Button
            colorScheme="orange"
            type="submit"
            marginBottom="1rem"
            isDisabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
            {isLoading && (
              <Spinner
                thickness="2px"
                emptyColor="gray.200"
                size="sm"
                color="orange"
              />
            )}
          </Button>
        </Box>
      </Form>
    </div>
  );
};

export default LoginForm;
