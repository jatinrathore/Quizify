import useQuestions from "../hooks/useQuestions";
import useQuestionsStore from "../store";
import QuestionCard from "./QuestionCard";
import { RiEnglishInput } from "react-icons/ri";
import { TbBrandCss3 } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { FaJava } from "react-icons/fa6";
import { TbBrandJavascript } from "react-icons/tb";
import { SiCplusplus } from "react-icons/si";
import { TbFileTypeHtml } from "react-icons/tb";
import "./css/QuestionContainer.css";

const QuestionsContainer = () => {
  const { data } = useQuestions();

  const selectedGenre = useQuestionsStore((s) => s.selectedGenre);
  const updatedData = data?.filter((qus) => qus.topicName === selectedGenre);

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

  return (
    <div className="question-box">
      {updatedData?.map((question, idx) => (
        <QuestionCard
          key={question.questionId}
          question={question.questionTitle}
          options={question.options}
          id={question.questionId}
          questionNo={idx}
          children={selectedIcon()}
        />
      ))}
    </div>
  );
};

export default QuestionsContainer;
