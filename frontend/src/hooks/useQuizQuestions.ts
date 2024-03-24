import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import QuestionsType from "../models/Questions";
import { TokenManager } from "../services/handleToken";

interface FetchResponseType {
  data: QuestionsType[];
  success: Boolean;
}
const useQuizQuestions = (endpoint: string) => {
  const token = TokenManager.getToken();

  const url = `${
    import.meta.env.VITE_QUIZIFY_SERVER_URL
  }/api/questions/quiz/${endpoint}`;

  return useQuery({
    queryKey: ["quiz-question"],
    queryFn: async () => {
      const res = await axios.get<FetchResponseType>(url, {
        headers: {
          "quizify-auth-token": token,
        },
      });

      return res.data;
    },
    staleTime: 24 * 60 * 60 * 1000, //24h
  });
};

export default useQuizQuestions;
