import QuestionsContainer from "../../components/QuestionContainer/QuestionsContainer";
import SideBar from "../../components/SideBar";
import "./LearningPage.css";

const LearningPage = () => {
  return (
    <div className="learning-page-container">
      <div className="container-aside">
        <SideBar />
      </div>
      <div className="container-main">
        <QuestionsContainer />
      </div>
      <div className="container-aside-right">Hello</div>
    </div>
  );
};

export default LearningPage;
