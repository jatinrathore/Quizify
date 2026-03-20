import useQuizQuestions from "../../hooks/useQuizQuestions";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Box, Link, Text } from "@chakra-ui/react";
import useTimer from "../../hooks/useTimer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuestionsStore from "../../store";
import QuizResult from "../../components/QuizResult";
import { TokenManager } from "../../services/handleToken";
import { GiBrain } from "react-icons/gi";
import "./quizpage1.css";
import { MdErrorOutline } from "react-icons/md";

const QuizPage = () => {
  const navigate = useNavigate();

  const tokenExists = TokenManager.isToken();

  useEffect(() => {
    if (!tokenExists) navigate("/");

    startTimer();
  }, [tokenExists]);

  const selectedEndpoint = useQuestionsStore((s) => s.selectedEndpoint);

  const { data, isLoading, isError } = useQuizQuestions(selectedEndpoint);

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

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="loading-icon">
            <GiBrain />
          </div>
          <div className="loading-text">Preparing Your Quiz</div>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
          <div className="loading-subtitle">
            Fetching brain-teasing questions...
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="quiz-container">
        <div className="qc-center-box quiz-state-box">
          <div className="header">
            <Link href="/home">
              <span className="back-btn">
                <IoIosArrowRoundBack size={24} />
                <Text>Back</Text>
              </span>
            </Link>
            <div className="timer">
              <div className="timer-circle">--:--</div>
            </div>
          </div>
          <div className="quiz-state-body">
            <div className="quiz-state-icon error">
              <MdErrorOutline />
            </div>
            <p className="quiz-state-title">Failed to load quiz</p>
            <p className="quiz-state-sub">
              Something went wrong while fetching your questions. Check your
              connection and try again.
            </p>
            <div className="quiz-state-btns">
              <button
                className="quiz-state-btn primary"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
              <button
                className="quiz-state-btn outline"
                onClick={() => navigate("/home")}
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  if (!isLoading && (!data?.data || data.data.length === 0))
    return (
      <div className="quiz-container">
        <div className="qc-center-box quiz-state-box">
          <div className="header">
            <Link href="/home">
              <span className="back-btn">
                <IoIosArrowRoundBack size={24} />
                <Text>Back</Text>
              </span>
            </Link>
          </div>
          <div className="quiz-state-body">
            <div className="quiz-state-icon empty">
              <GiBrain />
            </div>
            <p className="quiz-state-title">No questions available</p>
            <p className="quiz-state-sub">
              This topic doesn't have any quiz questions yet. Try a different
              topic.
            </p>
            <button
              className="quiz-state-btn outline"
              onClick={() => navigate("/home")}
            >
              Go home
            </button>
          </div>
        </div>
      </div>
    );

  const progressPercent = totalQuestions
    ? ((index + 1) / totalQuestions) * 100
    : 0;

  return (
    <div className="quiz-container">
      <div className="qc-center-box">
        <div className="header">
          <Link href="/home">
            <span className="back-btn">
              <IoIosArrowRoundBack size={24} />
              <Text>Back</Text>
            </span>
          </Link>
          <div className="timer">
            <div className="timer-circle">{`${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</div>
          </div>
        </div>

        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="quiz-progress-text">
            {index + 1}/{totalQuestions}
          </span>
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
                <span>A</span>
                {questionObject?.options[0]}
              </span>
              <span
                className={`ob-option`}
                onClick={() => handleClick(questionObject?.options[1] || "")}
              >
                <span>B</span>
                {questionObject?.options[1]}
              </span>
              <span
                className={`ob-option`}
                onClick={() => handleClick(questionObject?.options[2] || "")}
              >
                <span>C</span>
                {questionObject?.options[2]}
              </span>
              <span
                className={`ob-option`}
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
