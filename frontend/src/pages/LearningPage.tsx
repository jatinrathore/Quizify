import QuestionsContainer from "../components/QuestionsContainer";
import SideBar from "../components/SideBar";
import "./css/LearningPage.css";

const LearningPage = () => {
  return (
    <div className="learning-page-container">
      <div className="container-aside">
        <SideBar />
      </div>
      <div className="container-main">
        <QuestionsContainer />
      </div>
    </div>
  );
};

export default LearningPage;
