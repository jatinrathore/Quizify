import { FaRegCopyright } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import "./css/GitFooter.css";
import { Link, Text } from "@chakra-ui/react";

const GitFooter = () => {
  return (
    <div
      className="footer--container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "50px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaRegCopyright style={{ fontSize: "12px", color: "#8c8c8c" }} />
        <Text style={{ color: "#8c8c8c", marginLeft: "5px" }}>
          2023 Quiz-e-meter -
          <Link
            href={"https://github.com/jatinrathore"}
            style={{ color: "#8c8c8c", textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            - @jatinrathore
          </Link>
        </Text>
      </div>
      <Link
        href="https://github.com/jatinrathore"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaSquareGithub size="30px" color="black" />
      </Link>
    </div>
  );
};

export default GitFooter;
