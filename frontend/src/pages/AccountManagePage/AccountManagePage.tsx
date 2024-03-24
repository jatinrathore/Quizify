import NavBar from "../../components/NavBar";
import GitFooter from "../../components/GitFooter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignInSignUpForm from "../../components/SignInSignUpForm";
import { TokenManager } from "../../services/handleToken";

const AccountManagePage = () => {
  const navigate = useNavigate();

  const tokenExists = TokenManager.isToken();

  useEffect(() => {
    if (tokenExists) navigate("/home");
  }, [tokenExists]);

  return (
    <>
      <NavBar />
      <SignInSignUpForm />
      <GitFooter />
    </>
  );
};

export default AccountManagePage;
