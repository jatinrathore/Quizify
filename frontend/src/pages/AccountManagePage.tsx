import NavBar from "../components/NavBar";
import SignInSignUp from "../components/SignInSignUp";
import GitFooter from "../components/GitFooter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const AccountManagePage = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn]);
  return (
    <>
      <NavBar />
      <SignInSignUp />
      <GitFooter />
    </>
  );
};

export default AccountManagePage;
