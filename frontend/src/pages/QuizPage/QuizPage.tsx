import useQuizQuestions from "../../hooks/useQuizQuestions";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, Text } from "@chakra-ui/react";
import useTimer from "../../hooks/useTimer";
import "./QuizPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookieManager } from "../../services/handleCookies";
import useQuestionsStore from "../../store";
import QuizResult from "../../components/QuizResult";

const QuizPage = () => {
  const navigate = useNavigate();

  const cookieExists = CookieManager.isCookieSet();

  useEffect(() => {
    if (!cookieExists) navigate("/");

    startTimer();
  }, [cookieExists]);

  const selectedEndpoint = useQuestionsStore((s) => s.selectedEndpoint);

  const { data, isLoading } = useQuizQuestions(selectedEndpoint);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const { minutes, seconds, startTimer, timerRunning, stopTimer } = useTimer(1);
  const [index, setIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  const questionObject = data?.data[index];
  const totalQuestions = data && data?.data.length - 1;

  const formattedQuestion = questionObject?.questionTitle.replace(
    /<linebreak>/g,
    "<br />"
  );

  const nextQuestion = () => setIndex((prev) => prev + 1);

  const handleClick = (option: string) => {
    setSelectedOption(option);

    if (option === questionObject?.answer) {
      setCorrectAnswer((prev) => prev + 1);
    }
    nextQuestion();
  };

  if (isLoading) return <div>Loading...</div>;

  if (index === totalQuestions || !timerRunning) {
    if (timerRunning) stopTimer();

    return <QuizResult questions={data?.data || []} />;
  }

  return (
    <div className="quiz-container">
      <div className="center-box">
        <div className="header">
          <Link href="/home">
            <span className="back-btn">
              <IoIosArrowRoundBack />
              <Text>Back</Text>
            </span>
          </Link>
          <div className="timer">
            <div className="timer-circle">{`${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</div>
          </div>
        </div>
        <div className="quiz-question-container">
          <div className="question-box">
            <div className="title-box">
              <p
                dangerouslySetInnerHTML={{ __html: formattedQuestion || "" }}
              ></p>
              <p className="question-difficulty">
                {questionObject?.difficultyLevel}
              </p>
            </div>
            <div className="options-box">
              <span
                className={`option`}
                onClick={() => handleClick(questionObject?.options[0] || "")}
              >
                <span>A</span>
                {questionObject?.options[0]}
              </span>
              <span
                className={`option`}
                onClick={() => handleClick(questionObject?.options[1] || "")}
              >
                <span>B</span>
                {questionObject?.options[1]}
              </span>
              <span
                className={`option`}
                onClick={() => handleClick(questionObject?.options[2] || "")}
              >
                <span>C</span>
                {questionObject?.options[2]}
              </span>
              <span
                className={`option`}
                onClick={() => handleClick(questionObject?.options[3] || "")}
              >
                <span>D</span>
                {questionObject?.options[3]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
