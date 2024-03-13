import {
  Box,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import scriptlyLogo from "../../assets/quizify-high-resolution-logo-transparent.png";
import { PiUserSquareDuotone } from "react-icons/pi";
import LogoutModal from "../LogoutModal";
import { CookieManager } from "../../services/handleCookies";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const cookieExists = CookieManager.isCookieSet();
  const navigate = useNavigate();

  return (
    <Box
      padding="20px 0 20px 20px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image
        src={scriptlyLogo}
        className="navbar-logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
      {cookieExists && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            variant="outline"
            padding="10px"
            marginRight="20px"
          >
            <Box display="flex" cursor="pointer" alignItems="center">
              <Text fontWeight="500" fontSize="1.1rem" marginRight="5px">
                Profile
              </Text>
              <PiUserSquareDuotone fontSize="35px" />
            </Box>
          </MenuButton>
          <MenuList minW="0" w={"150px"}>
            <MenuGroup title="Profile">
              <MenuDivider />
              <MenuItem>My Account</MenuItem>
              <MenuItem>
                <LogoutModal />
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

export default NavBar;
