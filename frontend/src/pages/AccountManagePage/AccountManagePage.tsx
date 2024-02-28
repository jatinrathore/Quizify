import NavBar from "../../components/NavBar";
import SignInSignUp from "../../components/SignInSignUp";
import GitFooter from "../../components/GitFooter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CookieManager } from "../../services/handleCookies";

const AccountManagePage = () => {
  const navigate = useNavigate();

  const cookieExists = CookieManager.isCookieSet();

  useEffect(() => {
    if (cookieExists) navigate("/home");
  }, [cookieExists]);

  return (
    <>
      <NavBar />
      <SignInSignUp />
      <GitFooter />
    </>
  );
};

export default AccountManagePage;
