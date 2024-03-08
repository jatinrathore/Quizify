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
import "./QuizResult.css";
import { IoIosArrowRoundBack } from "react-icons/io";

interface Props {
  questions: QuestionsType[];
}

const QuizResult = ({ questions }: Props) => {
  console.log(questions);

  return (
    <div className="result-container">
      <div className="result-center-box">
        <div className="result-info">
          <Link href="/home">
            <span className="result-back-btn">
              <IoIosArrowRoundBack />
              <Text>Back</Text>
            </span>
          </Link>
        </div>
        <div className="question-answer-box">
          <Accordion allowToggle>
            {questions.map((q) => (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
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
                <AccordionPanel pb={4}>{q.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
