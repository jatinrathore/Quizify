import { Text } from "@chakra-ui/react";
import QuestionsContainer from "../../components/QuestionContainer/QuestionsContainer";
import SideBar from "../../components/SideBar";
import useQuestionsStore from "../../store";
import { useNavigate } from "react-router-dom";
import { PiListBold } from "react-icons/pi";
import "./learningpage.css";
import { useState } from "react";

const LearningPage = () => {
  const navigate = useNavigate();
  const setSelectedEndpoint = useQuestionsStore((s) => s.setSelectedEndpoint);
  const selectedGenre = useQuestionsStore((s) => s.selectedGenre);
  const [isasideOn, setAsideOn] = useState(true);

  const handleClick = (endpoint: string) => {
    setSelectedEndpoint(endpoint);
    navigate("/quiz");
  };

  return (
    <div className="learning-page-container">
      <button
        className={`lp-aside-btn ${isasideOn ? "" : "aside-close-btn"}`}
        onClick={() => setAsideOn(!isasideOn)}
      >
        {<PiListBold />}
      </button>
      <div className={`container-aside ${isasideOn ? "" : "aside-close"}`}>
        <Text className="c-aside-heading">Categories</Text>
        <SideBar />
      </div>
      <div className="container-main">
        <div className="c-main-heading-box">
          <Text className="c-main-heading">{selectedGenre}</Text>
        </div>
        <QuestionsContainer />
      </div>
      <div className="container-aside-right" style={{ cursor: "pointer" }}>
        <div>
          <Text className="r-aside-heading">Explore Quizzes</Text>
        </div>
        <div className="ra-card-container">
          <div className="r-aside-card">
            <Text className="ra-card-title">Programming Quiz</Text>
            <Text className="ra-card-subtitle">
              Dive into the world of programming with MCQs covering Java,
              JavaScript, and C++.
            </Text>
            <button
              className="ra-card-btn"
              onClick={() => handleClick("prog-lang")}
            >
              Take Quiz Now!
            </button>
          </div>
          <div className="r-aside-card">
            <Text className="ra-card-title">General Skills Quiz</Text>
            <Text className="ra-card-subtitle">
              Test your knowledge in general knowledge, aptitude, and English
              with our comprehensive MCQs.
            </Text>
            <button
              className="ra-card-btn"
              onClick={() => handleClick("general")}
            >
              Take Quiz Now!
            </button>
          </div>
          <div className="r-aside-card">
            <Text className="ra-card-title">Web Dev Quiz</Text>
            <Text className="ra-card-subtitle">
              Explore HTML, CSS, and JavaScript concepts with interactive MCQs
              for web enthusiasts.
            </Text>
            <button
              className="ra-card-btn"
              onClick={() => handleClick("web-dev")}
            >
              Take Quiz Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
