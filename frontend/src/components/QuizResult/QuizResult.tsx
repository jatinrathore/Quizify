import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import QuestionsType from "../../models/Questions";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  FiCheckCircle,
  FiXCircle,
  FiTarget,
  FiPercent,
  FiList,
} from "react-icons/fi";
import "./quizresult1.css";

interface Props {
  questions: QuestionsType[];
  totalQuestions: number;
  correctAnswer: number;
}

const QuizResult = ({ questions, totalQuestions, correctAnswer }: Props) => {
  const wrongAnswers = totalQuestions - correctAnswer;
  const percentage = Math.round((correctAnswer / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { grade: "A+", label: "Excellent!", class: "grade-excellent" };
    if (percentage >= 75) return { grade: "A", label: "Great Job!", class: "grade-excellent" };
    if (percentage >= 60) return { grade: "B", label: "Good Work!", class: "grade-good" };
    if (percentage >= 40) return { grade: "C", label: "Keep Practicing!", class: "grade-average" };
    return { grade: "D", label: "Needs Improvement", class: "grade-poor" };
  };

  const gradeInfo = getGrade();

  const getMessage = () => {
    if (percentage >= 90) return "Outstanding performance! You've mastered this topic! 🎉";
    if (percentage >= 75) return "Impressive work! You have a strong understanding! 💪";
    if (percentage >= 60) return "Good effort! A little more practice and you'll ace it! 📚";
    if (percentage >= 40) return "Not bad! Review the topics and try again! 🔄";
    return "Don't give up! Every attempt makes you better! 🌟";
  };

  // Score circle gradient
  const scoreGradient = `conic-gradient(var(--accent) ${percentage * 3.6}deg, var(--border) ${percentage * 3.6}deg)`;

  return (
    <div className="result-container">
      <div className="result-center-box">
        {/* Gradient Header */}
        <div className="result-header">
          <Link href="/home" style={{ textDecoration: "none" }}>
            <span className="result-back-btn">
              <IoIosArrowRoundBack size={22} />
              <Text>Back</Text>
            </span>
          </Link>
          <Text className="result-header-title">Quiz Complete!</Text>
        </div>

        {/* Score Section */}
        <div className="result-score-section">
          <div className="score-circle-container">
            <div
              className="score-circle-bg"
              style={{ background: scoreGradient }}
            >
              <div className="score-circle-inner">
                <span className="score-percentage">{percentage}%</span>
                <span className="score-label">Score</span>
              </div>
            </div>
          </div>

          <span className={`grade-badge ${gradeInfo.class}`}>
            {gradeInfo.grade} — {gradeInfo.label}
          </span>

          <Text className="result-message">{getMessage()}</Text>
        </div>

        {/* Stats Row */}
        <div className="result-stats-row">
          <div className="stat-card">
            <span className="stat-icon">
              <FiList />
            </span>
            <span className="stat-value">{totalQuestions}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon" style={{ color: "var(--success)" }}>
              <FiCheckCircle />
            </span>
            <span className="stat-value">{correctAnswer}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon" style={{ color: "var(--error)" }}>
              <FiXCircle />
            </span>
            <span className="stat-value">{wrongAnswers}</span>
            <span className="stat-label">Wrong</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon" style={{ color: "var(--accent)" }}>
              <FiPercent />
            </span>
            <span className="stat-value">{percentage}%</span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>

        {/* Answers accordion */}
        <div className="result-answers-section">
          <div className="answers-heading">
            <FiTarget />
            <span>Review Answers</span>
          </div>
          <Accordion allowToggle>
            {questions.map((q, idx) => (
              <AccordionItem
                key={idx}
                className="result-accordion-item"
                border="none"
              >
                <h2>
                  <AccordionButton className="result-accordion-btn">
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      display="flex"
                      gap="10px"
                      fontWeight="500"
                    >
                      <p>{`${idx + 1}.`}</p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: q.questionTitle.replace(
                            /<linebreak>/g,
                            "<br />"
                          ),
                        }}
                      ></p>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel className="result-accordion-panel">
                  <FiCheckCircle />
                  {`Answer: ${q.answer}`}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
