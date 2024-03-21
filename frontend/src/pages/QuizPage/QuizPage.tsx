import useQuizQuestions from "../../hooks/useQuizQuestions";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Box, Link, Text } from "@chakra-ui/react";
import useTimer from "../../hooks/useTimer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookieManager } from "../../services/handleCookies";
import useQuestionsStore from "../../store";
import QuizResult from "../../components/QuizResult";
import "./quizpage1.css";

const QuizPage = () => {
  const navigate = useNavigate();

  const cookieExists = CookieManager.isCookieSet();

  useEffect(() => {
    if (!cookieExists) navigate("/");

    startTimer();
  }, [cookieExists]);

  const selectedEndpoint = useQuestionsStore((s) => s.selectedEndpoint);

  const { data, isLoading } = useQuizQuestions(selectedEndpoint);

  const [_, setSelectedOption] = useState<string>("");
  const { minutes, seconds, startTimer, timerRunning, stopTimer } = useTimer(5);
  const [index, setIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  const questionObject = data?.data[index];
  const totalQuestions = data && data?.data.length;

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

    return (
      <QuizResult
        questions={data?.data || []}
        totalQuestions={totalQuestions || 15}
        correctAnswer={correctAnswer}
      />
    );
  }

  return (
    <div className="quiz-container">
      <div className="qc-center-box">
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
              <Box display="flex" gap="5px" fontWeight="700">
                <p>{`${index + 1}.`}</p>
                <p
                  dangerouslySetInnerHTML={{ __html: formattedQuestion || "" }}
                  className="qb-question"
                ></p>
              </Box>
              <p className="question-difficulty">
                {questionObject?.difficultyLevel}
              </p>
            </div>
            <div className="options-box">
              <span
                className={`ob-option`}
                onClick={() => handleClick(questionObject?.options[0] || "")}
              >
                <span style={{ marginRight: "10px" }}>A</span>
                {questionObject?.options[0]}
              </span>
              <span
                className={`ob-option`}
                onClick={() => handleClick(questionObject?.options[1] || "")}
              >
                <span style={{ marginRight: "10px" }}>B</span>
                {questionObject?.options[1]}
              </span>
              <span
                className={`ob-option`}
                onClick={() => handleClick(questionObject?.options[2] || "")}
              >
                <span style={{ marginRight: "10px" }}>C</span>
                {questionObject?.options[2]}
              </span>
              <span
                className={`ob-option`}
                onClick={() => handleClick(questionObject?.options[3] || "")}
              >
                <span style={{ marginRight: "10px" }}>D</span>
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
