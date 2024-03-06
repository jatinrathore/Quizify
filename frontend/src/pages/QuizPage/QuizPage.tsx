import useQuizQuestions from "../../hooks/useQuizQuestions";
import "./QuizPage.css";

const QuizPage = () => {
  const { data: { questions } = {} } = useQuizQuestions("prog-lang");

  return (
    <div className="quiz-container">
      <div className="center-box">
        <div className="header">
          <span className="back-btn"></span>
          <div className="timer"></div>
        </div>
        <div className="question-box">
          <div className="title-box"></div>
          <div className="options-box"></div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
