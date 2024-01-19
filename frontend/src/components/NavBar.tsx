import { Image, Text } from "@chakra-ui/react";
import scriptlyLogo from "../assets/Scriptly-logo.png";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "5px",
      }}
    >
      <Image src={scriptlyLogo} height="75px" />
      <Text
        style={{
          fontSize: "30px",
          fontWeight: 600,
          fontFamily: "monospace",
          marginLeft: "5px",
        }}
      >
        Quiz-e-Meter
      </Text>
    </div>
  );
};

export default NavBar;
