import { create } from "zustand";

interface QestionsStore {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const useQuestionsStore = create<QestionsStore>((set) => ({
  selectedGenre: "english",
  setSelectedGenre: (genre) =>
    set((store) => ({ ...store, selectedGenre: genre })),
}));

export default useQuestionsStore;
