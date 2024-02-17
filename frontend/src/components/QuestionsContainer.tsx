import useQuestions from "../hooks/useQuestions";
import QuestionCard from "./QuestionCard";

interface Props {
  selectedGenre: string;
}
const QuestionsContainer = ({ selectedGenre }: Props) => {
  const { data } = useQuestions();

  const updatedData = data?.filter((qus) => qus.topicName === selectedGenre);

  return (
    <div className="question--box">
      {updatedData?.map((question) => (
        <QuestionCard
          key={question.questionId}
          question={question.questionTitle}
          options={question.options}
          id={question.questionId}
        />
      ))}
    </div>
  );
};

export default QuestionsContainer;
