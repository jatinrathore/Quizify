import { Box, Image, Text } from "@chakra-ui/react";
import scriptlyLogo from "../../assets/quizify-high-resolution-logo-transparent.png";
import LogoutModal from "../LogoutModal";
import { CookieManager } from "../../services/handleCookies";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./navbar.css";

const NavBar = () => {
  const cookieExists = CookieManager.isCookieSet();
  const navigate = useNavigate();

  return (
    <Box
      borderRadius={10}
      padding="20px 0 20px 20px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow={"rgba(0, 0, 0, 0.04) 0px 3px 5px"}
      marginBottom={4}
    >
      <Image
        src={scriptlyLogo}
        className="navbar-logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
      <Box className="navbar-right-box">
        {cookieExists && (
          <button className="profile-btn">
            <FaUserAlt />
          </button>
        )}
        <Box className="navbar-text">
          {cookieExists ? (
            <LogoutModal />
          ) : (
            <button
              onClick={() => navigate("/account-manage")}
              style={{ fontWeight: "700" }}
            >
              Log In
            </button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
