import { Box, Text } from "@chakra-ui/react";
import "./css/QuestionCard.css";
import useQuestions from "../hooks/useQuestions";
import { useState } from "react";
interface Props {
  question: string;
  options: string[];
  id: string;
}

const QuestionCard = ({ question, options, id }: Props) => {
  const formattedQuestion = question.replace(/<linebreak>/g, "<br />");

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data } = useQuestions();

  let isAnswerFound = false;

  const handleClick = (option: string) => {
    if (isAnswerFound) return;
    setSelectedOption(option); // Set the selected option
  };

  const checkIfAnswer = (option: string) => {
    const question = data?.find((d) => d.questionId === id);

    if (selectedOption === option && question?.answer === option) {
      isAnswerFound = true;
      return "green";
    }

    if (selectedOption === option && question?.answer !== option) {
      return "crossed";
    }
  };

  return (
    <div>
      <div className="question-title">
        <p dangerouslySetInnerHTML={{ __html: formattedQuestion }}></p>
      </div>
      <div className="question-options">
        <Box
          className={`opt-area ${checkIfAnswer(options[0])}`}
          onClick={() => handleClick(options[0])}
        >
          <p className="opt-box">A</p>
          <p className="opt-text">{options[0]}</p>
        </Box>
        <Box
          className={`opt-area ${checkIfAnswer(options[1])}`}
          onClick={() => handleClick(options[1])}
        >
          <p className="opt-box">B</p>
          <p className="opt-text">{options[1]}</p>
        </Box>
        <Box
          className={`opt-area ${checkIfAnswer(options[2])}`}
          onClick={() => handleClick(options[2])}
        >
          <p className="opt-box">C</p>
          <p className="opt-text">{options[2]}</p>
        </Box>
        <Box
          className={`opt-area ${checkIfAnswer(options[3])}`}
          onClick={() => handleClick(options[3])}
        >
          <p className="opt-box">D</p>
          <p className="opt-text">{options[3]}</p>
        </Box>
      </div>
    </div>
  );
};

export default QuestionCard;
