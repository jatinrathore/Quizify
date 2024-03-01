import { create } from "zustand";

interface QestionsStore {
  page: number;
  pageSize: number;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  setNextPage: () => void;
  setPrevPage: () => void;
}

const useQuestionsStore = create<QestionsStore>((set) => ({
  page: 1,
  pageSize: 10,
  selectedGenre: "english",
  setSelectedGenre: (genre) =>
    set((store) => ({
      ...store,
      selectedGenre: genre,
      page: genre === store.selectedGenre ? store.page : 1,
    })),
  setNextPage: () => set((store) => ({ ...store, page: store.page + 1 })),
  setPrevPage: () => set((store) => ({ ...store, page: store.page - 1 })),
}));

export default useQuestionsStore;
