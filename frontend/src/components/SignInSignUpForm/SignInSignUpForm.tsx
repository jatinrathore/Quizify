import { useState } from "react";
import SignUpForm from "../SignUpForm";
import SignInForm from "../SignInForm";
import { Text } from "@chakra-ui/react";
import "./signinsignupform.css";

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <div className="outer-container">
      <div
        className={`container ${isSignUp ? "right-panel-active" : ""}`}
        id="container"
      >
        <div
          className={`form-container sign-up-container ${
            isSignUp ? "active" : ""
          }`}
        >
          <SignUpForm />
        </div>
        <div
          className={`form-container sign-in-container ${
            !isSignUp ? "active" : ""
          }`}
        >
          <SignInForm />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Text
                className="corner-btn corner-l"
                onClick={() => setIsSignUp(false)}
              >
                Sign In?
              </Text>
              <h1 className="overlay-heading">Welcome Back!</h1>
              <p className="overlay-para">
                Already a member? Sign in now to continue learning!
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <Text
                className="corner-btn corner-r"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up?
              </Text>
              <h1 className="overlay-heading">Hello, Friend!</h1>
              <p className="overlay-para">
                Ready to dive deeper? Sign up now and learn more!
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpForm;
