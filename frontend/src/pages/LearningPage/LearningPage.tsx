import { Text } from "@chakra-ui/react";
import QuestionsContainer from "../../components/QuestionContainer/QuestionsContainer";
import SideBar from "../../components/SideBar";
import useQuestionsStore from "../../store";
import { useNavigate } from "react-router-dom";
import "./learningpage.css";

const LearningPage = () => {
  const navigate = useNavigate();
  const setSelectedEndpoint = useQuestionsStore((s) => s.setSelectedEndpoint);

  const handleClick = (endpoint: string) => {
    setSelectedEndpoint(endpoint);
    navigate("/quiz");
  };

  return (
    <div className="learning-page-container">
      <div className="container-aside">
        <SideBar />
      </div>
      <div className="container-main">
        <QuestionsContainer />
      </div>
      <div className="container-aside-right" style={{ cursor: "pointer" }}>
        <div className="r-aside-card">
          <Text onClick={() => handleClick("prog-lang")}>Technical</Text>
        </div>
        <div className="r-aside-card">
          <Text onClick={() => handleClick("general")}>General</Text>
        </div>
        <div className="r-aside-card">
          <Text onClick={() => handleClick("web-dev")}>Web Dev</Text>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
