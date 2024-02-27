import axios from "axios";
import { useQuery } from "react-query";

export interface QuestionsType {
  questionId: string;
  questionTitle: string;
  options: [string];
  answer: string;
  points: number;
  topicName: string;
  difficultyLevel: string;
}

const useQuestions = () => {
  const token = localStorage.getItem(import.meta.env.VITE_QUIZIFY_LS_KEY);

  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await axios.get<QuestionsType[]>(
        "http://localhost:3000/api/questions",
        {
          headers: {
            "quizify-auth-token": token,
          },
        }
      );

      return res.data;
    },
    staleTime: 24 * 60 * 60 * 1000, //24h
    keepPreviousData: true,
  });
};

export default useQuestions;
