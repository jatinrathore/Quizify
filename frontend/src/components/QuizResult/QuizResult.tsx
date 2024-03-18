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
import "./quizresult.css";

interface Props {
  questions: QuestionsType[];
  totalQuestions: number;
  correctAnswer: number;
}

const QuizResult = ({ questions, totalQuestions, correctAnswer }: Props) => {
  console.log(questions);

  return (
    <div className="result-container">
      <div className="result-center-box">
        <Link href="/home">
          <span className="result-back-btn">
            <IoIosArrowRoundBack />
            <Text>Back</Text>
          </span>
        </Link>
        <div className="result-info">
          <Text className="ri-heading">Quiz Result</Text>
          <Text className="ri-text">
            Congratulations on completing the quiz! Here are your results:
          </Text>
          <Text className="total-ques">{`Total Questions : ${totalQuestions}`}</Text>
          <Text className="correct-ans">{`Correct Answers : ${correctAnswer}`}</Text>
        </div>
        <div className="question-answer-box">
          <Accordion allowToggle>
            {questions.map((q, idx) => (
              <AccordionItem>
                <h2>
                  <AccordionButton>
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
                <AccordionPanel pb={4}>{`Ans : ${q.answer}`}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
