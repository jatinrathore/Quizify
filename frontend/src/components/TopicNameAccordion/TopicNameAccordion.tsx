import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import useQuestions from "../../hooks/useQuestions";
import useQuestionsStore from "../../store";
import StringUtils from "../../services/handleStrings";
import "./topicnameaccordion.css";

interface Props {
  title: string;
  genre: string;
}

const TopicNameAccordion = ({ title, genre }: Props) => {
  const { isLoading, data: { questions } = {} } = useQuestions();
  const setSelectedGenre = useQuestionsStore((s) => s.setSelectedGenre);

  const handleClickAccordion = () => {
    setSelectedGenre(genre);
  };

  const skeletonArray = new Array(10).fill(0);

  return (
    <AccordionItem style={{ border: "none", borderRadius: "10px" }} mb="20px">
      <h2>
        <AccordionButton
          _expanded={{
            bg: "#D8B4F8",
            color: "white",
          }}
          onClick={handleClickAccordion}
          className="accordion-btn"
          padding="13px"
          _hover={{
            bg: "#D8B4F8",
            color: "white",
          }}
        >
          <Box as="span" flex="1" textAlign="left" className="accordion-text">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <ul className="accordion-list">
          {isLoading &&
            skeletonArray.map((_, idx) => (
              <Skeleton
                key={idx}
                startColor="#f3ccf3"
                endColor="#D8B4F8"
                borderRadius="10px"
                className="accordion-list-item"
              />
            ))}
          {questions?.map((qus, idx) => (
            <li key={idx} className="accordion-list-item">
              <a href={`#${qus.questionId}`}>
                <Box className="list-item-title">
                  <Box as="span">
                    {`Q${StringUtils.extractNumberFromString(qus.questionId)}`}
                  </Box>{" "}
                  <Box as="span">
                    {StringUtils.cropQuestionTitle(qus.questionTitle)}
                  </Box>
                </Box>
              </a>
            </li>
          ))}
        </ul>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TopicNameAccordion;
