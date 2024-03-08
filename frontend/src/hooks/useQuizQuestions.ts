import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CookieManager } from "../services/handleCookies";
import QuestionsType from "../models/Questions";

interface FetchResponseType {
  data: QuestionsType[];
  success: Boolean;
}
const useQuizQuestions = (endpoint: string) => {
  const cookie = CookieManager.getCookie();

  const url = `${
    import.meta.env.VITE_QUIZIFY_SERVER_URL
  }api/questions/quiz/${endpoint}`;

  return useQuery({
    queryKey: ["quiz-question"],
    queryFn: async () => {
      const res = await axios.get<FetchResponseType>(url, {
        headers: {
          "quizify-auth-token": cookie,
        },
      });

      return res.data;
    },
    staleTime: 24 * 60 * 60 * 1000, //24h
  });
};

export default useQuizQuestions;
