import NavBar from "../../components/NavBar";
import GitFooter from "../../components/GitFooter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CookieManager } from "../../services/handleCookies";
import SignInSignUpForm from "../../components/SignInSignUpForm";

const AccountManagePage = () => {
  const navigate = useNavigate();

  const cookieExists = CookieManager.isCookieSet();

  useEffect(() => {
    if (cookieExists) navigate("/home");
  }, [cookieExists]);

  return (
    <>
      <NavBar />
      <SignInSignUpForm />
      <GitFooter />
    </>
  );
};

export default AccountManagePage;
