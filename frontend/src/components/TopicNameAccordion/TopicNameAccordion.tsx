import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import useQuestions from "../../hooks/useQuestions";
import useQuestionsStore from "../../store";
import "./TopicNameAccordion.css";

interface Props {
  title: string;
  genre: string;
}

const TopicNameAccordion = ({ title, genre }: Props) => {
  const handleClickAccordion = () => {
    setSelectedGenre(genre);
  };

  const { data } = useQuestions();

  const filteredData = data?.filter((d) => d.topicName === genre);

  const setSelectedGenre = useQuestionsStore((s) => s.setSelectedGenre);

  const cropQuestionTitle = (questionTitle: string) => {
    const firstLinebreakIndex = questionTitle.indexOf("<linebreak>");
    if (firstLinebreakIndex !== -1) {
      return questionTitle.substring(0, firstLinebreakIndex);
    }
    return questionTitle;
  };

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
      <AccordionPanel>
        <ul className="accordion-list">
          {filteredData?.map((qus, idx) => (
            <li key={idx} className="accordion-list-item">
              <a href={`#${qus.questionId}`}>
                {" "}
                {`Q${idx + 1} ${cropQuestionTitle(qus.questionTitle)}`}
              </a>
            </li>
          ))}
        </ul>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TopicNameAccordion;
