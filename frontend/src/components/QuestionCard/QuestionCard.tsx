import { Box } from "@chakra-ui/react";
import useQuestions from "../../hooks/useQuestions";
import { ReactNode, useState } from "react";
import { TiTick } from "react-icons/ti";
import "./questioncard1.css";

interface Props {
  question: string;
  options: string[];
  id: string;
  questionNo: number;
  children: ReactNode;
}

const QuestionCard = ({
  question,
  options,
  id,
  questionNo,
  children,
}: Props) => {
  const formattedQuestion = question.replace(/<linebreak>/g, "<br />");

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data: { questions } = {} } = useQuestions();

  let isAnswerFound = false;

  const handleClick = (option: string) => {
    if (isAnswerFound) return;
    setSelectedOption(option); // Set the selected option
  };

  const checkIfAnswer = (option: string) => {
    const question = questions?.find((d) => d.questionId === id);

    if (selectedOption === option && question?.answer === option) {
      isAnswerFound = true;
      return "green";
    }

    if (selectedOption === option && question?.answer !== option) {
      return "crossed";
    }
  };

  return (
    <div className="question-card">
      <div className="question-title" id={id}>
        <p style={{ marginRight: "10px" }}>{`Q${questionNo}`}</p>
        <p dangerouslySetInnerHTML={{ __html: formattedQuestion }}></p>
      </div>
      <div className="question-options">
        <Box
          className={`opt-area ${checkIfAnswer(options[0])}`}
          onClick={() => handleClick(options[0])}
        >
          <div>
            <p className="opt-box">A</p>
          </div>
          <div>
            <p className="opt-text">{options[0]}</p>
            <p className="opt-icon">
              <TiTick />{" "}
            </p>
          </div>
        </Box>
        <Box
          className={`opt-area ${checkIfAnswer(options[1])}`}
          onClick={() => handleClick(options[1])}
        >
          <div>
            <p className="opt-box">B</p>
          </div>
          <div>
            <p className="opt-text">{options[1]}</p>
            <p className="opt-icon">
              <TiTick />{" "}
            </p>
          </div>
        </Box>
        <Box
          className={`opt-area ${checkIfAnswer(options[2])}`}
          onClick={() => handleClick(options[2])}
        >
          <div>
            <p className="opt-box">C</p>
          </div>
          <div>
            <p className="opt-text">{options[2]}</p>
            <p className="opt-icon">
              <TiTick />{" "}
            </p>
          </div>
        </Box>
        <Box
          className={`opt-area ${checkIfAnswer(options[3])}`}
          onClick={() => handleClick(options[3])}
        >
          <div>
            <p className="opt-box">D</p>
          </div>
          <div>
            <p className="opt-text">{options[3]}</p>
            <p className="opt-icon">
              <TiTick />{" "}
            </p>
          </div>
        </Box>
      </div>
      <div className="question-card-bg-icon">{children}</div>
    </div>
  );
};

export default QuestionCard;
