import useQuestions from "../../hooks/useQuestions";
import useQuestionsStore from "../../store";
import QuestionCard from "../QuestionCard";
import { RiEnglishInput } from "react-icons/ri";
import { TbBrandCss3 } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { FaJava } from "react-icons/fa6";
import { TbBrandJavascript } from "react-icons/tb";
import { SiCplusplus } from "react-icons/si";
import { TbFileTypeHtml } from "react-icons/tb";
import { Box, IconButton, SkeletonText, Stack } from "@chakra-ui/react";
import { TbPlayerTrackNext } from "react-icons/tb";
import { TbPlayerTrackPrev } from "react-icons/tb";
import StringUtils from "../../services/handleStrings";
import { useEffect } from "react";
import "./questioncontainer.css";

const QuestionsContainer = () => {
  const { selectedGenre, page, setNextPage, setPrevPage } = useQuestionsStore();

  const { isLoading, data: { questions, totalPages } = {} } = useQuestions();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, [page]);

  const selectedIcon = () => {
    if (selectedGenre === "javascript") return <TbBrandJavascript />;
    else if (selectedGenre === "css") return <TbBrandCss3 />;
    else if (selectedGenre === "java") return <FaJava />;
    else if (selectedGenre === "general knowledge") return <BiWorld />;
    else if (selectedGenre === "aptitude") return <GiBrain />;
    else if (selectedGenre === "c++") return <SiCplusplus />;
    else if (selectedGenre === "html") return <TbFileTypeHtml />;
    else return <RiEnglishInput />;
  };

  const skeletonCardArray = new Array(10).fill(0);

  if (isLoading)
    return (
      <Stack spacing={5}>
        {skeletonCardArray.map((_, idx) => (
          <Box
            padding="6"
            boxShadow="lg"
            bg="white"
            backgroundColor="#f3ccf3"
            borderRadius="10px"
            key={idx}
          >
            <SkeletonText
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="2"
              startColor="#f3ccf3"
              endColor="#D8B4F8"
            />
          </Box>
        ))}
      </Stack>
    );
  return (
    <>
      <div className="question-box">
        {questions?.map((question, idx) => (
          <QuestionCard
            key={question.questionId}
            question={question.questionTitle}
            options={question.options}
            id={question.questionId}
            questionNo={
              StringUtils.extractNumberFromString(question.questionId) || idx
            }
            children={selectedIcon()}
          />
        ))}
      </div>
      <div className="page-btn-group">
        <div className="prev-btn">
          {page !== 1 && (
            <IconButton
              variant="solid"
              colorScheme="pink"
              aria-label="Prev Page"
              fontSize="20px"
              icon={<TbPlayerTrackPrev />}
              onClick={() => setPrevPage()}
            />
          )}
        </div>
        <div className="next-btn">
          {page !== totalPages && (
            <IconButton
              variant="solid"
              colorScheme="pink"
              aria-label="Next Page"
              fontSize="20px"
              icon={<TbPlayerTrackNext />}
              onClick={() => setNextPage()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionsContainer;
