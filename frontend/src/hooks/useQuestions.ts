import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useQuestionsStore from "../store";
import QuestionsType from "../models/Questions";
import { TokenManager } from "../services/handleToken";

interface FetchResponseType {
  questions: QuestionsType[];
  totalPages: number;
}

const useQuestions = () => {
  const token = TokenManager.getToken();

  const endpoint = `${import.meta.env.VITE_QUIZIFY_SERVER_URL}/api/questions`;

  const { selectedGenre, page, pageSize } = useQuestionsStore();

  return useQuery({
    queryKey: ["questions", page, pageSize, selectedGenre],
    queryFn: async () => {
      const res = await axios.get<FetchResponseType>(endpoint, {
        params: {
          page: page,
          pageSize: pageSize,
          topicName: selectedGenre,
        },
        headers: {
          "quizify-auth-token": token,
        },
      });

      return res.data;
    },
    staleTime: 24 * 60 * 60 * 1000, //24h
  });
};

export default useQuestions;
