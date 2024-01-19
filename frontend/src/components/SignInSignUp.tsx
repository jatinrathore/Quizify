import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./css/SignInSignUp.css";

const SignInSignUp = () => {
  const [logInForm, setLogInform] = useState(true);

  return (
    <div className="user_access--container">
      <div className="box">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            paddingBottom: "40px",
          }}
        >
          <button
            className="box--button"
            onClick={() => {
              setLogInform(false);
            }}
          >
            SignUp Form
          </button>
          <button
            className="box--button"
            onClick={() => {
              setLogInform(true);
            }}
          >
            LogIn Form
          </button>
        </div>
        <div className="box--content">
          {logInForm ? (
            <LoginForm />
          ) : (
            <SignUpForm onSignUpSuccess={() => setLogInform(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
