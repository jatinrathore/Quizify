import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Form } from "react-router-dom";
import { LoginFormData, validateLoginInput } from "../models/Login";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import "./css/Form.css";

const LoginForm = () => {
  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const passwordRequirements =
    "Password should be at least 8 characters, including at least one capital letter and one numeric or special character.";

  //event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const validationErrors = validateLoginInput({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
      [name]: "",
    }));
  };

  //handle login form submit
  const handleLogin = async () => {
    const validationErrors = validateLoginInput(formData, {
      abortEarlyProp: false,
    });
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);
    setErrors({});
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
            {errors.email && <Text className="error-text">{errors.email}</Text>}

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
            {errors.password && (
              <Text className="error-text">{passwordRequirements}</Text>
            )}
          </Stack>
        </div>
        <Box
          className="buttons"
          style={{ textAlign: "center", marginTop: "30px" }}
        >
          <Button colorScheme="linkedin" type="submit">
            Log in
          </Button>
        </Box>
      </Form>
    </div>
  );
};

export default LoginForm;
