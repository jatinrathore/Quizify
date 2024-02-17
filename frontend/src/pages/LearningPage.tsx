import { useState } from "react";
import QuestionsContainer from "../components/QuestionsContainer";
import SideBar from "../components/SideBar";
import "./css/LearningPage.css";

const LearningPage = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("english");

  return (
    <div className="learning-page-container">
      <div className="container-aside">
        <SideBar onChangeGenre={(genre) => setSelectedGenre(genre)} />
      </div>
      <div className="container-main">
        <QuestionsContainer selectedGenre={selectedGenre} />
      </div>
    </div>
  );
};

export default LearningPage;
