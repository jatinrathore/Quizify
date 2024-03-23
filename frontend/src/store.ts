import { create } from "zustand";

interface QuestionsStore {
  page: number;
  pageSize: number;
  selectedGenre: string;
  selectedEndpoint: string;
  setSelectedGenre: (genre: string) => void;
  setSelectedEndpoint: (endpoint: string) => void;
  setNextPage: () => void;
  setPrevPage: () => void;
}

const useQuestionsStore = create<QuestionsStore>((set) => ({
  page: 1,
  pageSize: 10,
  selectedGenre: "english",
  selectedEndpoint: "web-dev",
  setSelectedGenre: (genre: string) =>
    set((store) => ({
      ...store,
      selectedGenre: genre,
      page: genre === store.selectedGenre ? store.page : 1,
    })),
  setSelectedEndpoint: (endpoint: string) => {
    set((store) => ({ ...store, selectedEndpoint: endpoint }));
  },
  setNextPage: () => set((store) => ({ ...store, page: store.page + 1 })),
  setPrevPage: () => set((store) => ({ ...store, page: store.page - 1 })),
}));

export default useQuestionsStore;
