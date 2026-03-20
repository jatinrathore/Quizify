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
import { Box, SkeletonText, Stack } from "@chakra-ui/react";
import { TbPlayerTrackNext } from "react-icons/tb";
import { TbPlayerTrackPrev } from "react-icons/tb";
import StringUtils from "../../services/handleStrings";
import { useEffect } from "react";
import "./questioncontainer1.css";
import { MdErrorOutline } from "react-icons/md";

const QuestionsContainer = () => {
  const { selectedGenre, page, setNextPage, setPrevPage } = useQuestionsStore();

  const { isLoading, isError, data: { questions, totalPages } = {} } = useQuestions();

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
            bg="var(--bg-surface)"
            backgroundColor="var(--bg-accent-soft)"
            borderRadius="10px"
            key={idx}
          >
            <SkeletonText
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="2"
              startColor="var(--bg-accent-soft)"
              endColor="var(--accent)"
            />
          </Box>
        ))}
      </Stack>
    );

  if (isError)
    return (
      <div className="state-container">
        <div className="state-icon error">
          <MdErrorOutline />
        </div>
        <p className="state-title">Something went wrong</p>
        <p className="state-subtitle">Failed to load questions. Please try again.</p>
        <button
          className="retry-btn"
          onClick={() => window.location.reload()}
          style={{
            marginTop: "8px",
            padding: "8px 20px",
            background: "var(--accent)",
            color: "var(--text-on-accent)",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Retry
        </button>
      </div>
    );

  if (!questions || questions.length === 0)
    return (
      <div className="state-container">
        <div className="state-icon empty">
          <BiWorld />
        </div>
        <p className="state-title">No questions found</p>
        <p className="state-subtitle">
          There are no questions available for this topic yet.
        </p>
      </div>
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
            <button
              onClick={() => setPrevPage()}
              style={{
                background: "var(--accent)",
                color: "var(--text-on-accent)",
                border: "none",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent)")
              }
            >
              <TbPlayerTrackPrev />
            </button>
          )}
        </div>
        <div className="next-btn">
          {page !== totalPages && (
            <button
              onClick={() => setNextPage()}
              style={{
                background: "var(--accent)",
                color: "var(--text-on-accent)",
                border: "none",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent)")
              }
            >
              <TbPlayerTrackNext />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionsContainer;
