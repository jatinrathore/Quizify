import { FaRegCopyright } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { Link, Text } from "@chakra-ui/react";
import "./gitfooter1.css";

const GitFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className="git-footer-container">
      <Link
        href={"https://github.com/jatinrathore"}
        style={{ textDecoration: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text className="git-footer-text">
          <FaRegCopyright style={{ fontSize: "12px" }} />
          {year} Quizify : @jatinrathore
        </Text>
      </Link>
      <Link
        href="https://github.com/jatinrathore/quizify"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaSquareGithub className="git-footer-logo" />
      </Link>
    </div>
  );
};

export default GitFooter;
