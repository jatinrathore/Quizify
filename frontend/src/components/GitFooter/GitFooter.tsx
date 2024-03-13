import { FaRegCopyright } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { Link, Text } from "@chakra-ui/react";
import "./gitfooter.css";

const GitFooter = () => {
  return (
    <div className="footer--container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaRegCopyright style={{ fontSize: "12px", color: "#8c8c8c" }} />
        <Text
          style={{ color: "#8c8c8c", marginLeft: "5px" }}
          className="git-footer-text"
        >
          2024 Quizify -
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
        <FaSquareGithub size="30px" color="black" className="git-footer-logo" />
      </Link>
    </div>
  );
};

export default GitFooter;
