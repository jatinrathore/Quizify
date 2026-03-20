import { create } from "zustand";
import {
  type ThemeMode,
  type ColorThemeId,
  getThemeVariables,
  applyThemeVariables,
  applyThemeWithRipple,
  colorThemes,
} from "./ThemeConfig";

interface QuestionsStore {
  page: number;
  pageSize: number;
  selectedGenre: string;
  selectedEndpoint: string;
  themeMode: ThemeMode;
  colorTheme: ColorThemeId;
  setSelectedGenre: (genre: string) => void;
  setSelectedEndpoint: (endpoint: string) => void;
  setNextPage: () => void;
  setPrevPage: () => void;
  toggleThemeMode: (origin?: { x: number; y: number }) => void;
  setColorTheme: (
    themeId: ColorThemeId,
    origin?: { x: number; y: number }
  ) => void;
}

const getInitialMode = (): ThemeMode => {
  const saved = localStorage.getItem("quizify-theme-mode");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialColorTheme = (): ColorThemeId => {
  const saved = localStorage.getItem("quizify-color-theme");
  const valid = colorThemes.some((t) => t.id === saved);
  if (valid) return saved as ColorThemeId;
  return "indigo";
};

const useQuestionsStore = create<QuestionsStore>((set, get) => ({
  page: 1,
  pageSize: 10,
  selectedGenre: "english",
  selectedEndpoint: "web-dev",
  themeMode: getInitialMode(),
  colorTheme: getInitialColorTheme(),

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

  toggleThemeMode: (origin) => {
    const state = get();
    const newMode: ThemeMode =
      state.themeMode === "light" ? "dark" : "light";
    const variables = getThemeVariables(state.colorTheme, newMode);

    localStorage.setItem("quizify-theme-mode", newMode);
    document.documentElement.setAttribute("data-theme", newMode);

    if (origin) {
      // Use the NEW background color as the ripple color
      const rippleColor = variables["--bg-primary"];
      applyThemeWithRipple(variables, origin, rippleColor);
    } else {
      applyThemeVariables(variables);
    }

    set({ themeMode: newMode });
  },

  setColorTheme: (themeId, origin) => {
    const state = get();
    if (themeId === state.colorTheme) return;

    const variables = getThemeVariables(themeId, state.themeMode);

    localStorage.setItem("quizify-color-theme", themeId);

    if (origin) {
      // Use the NEW accent color as the ripple color
      const rippleColor = variables["--accent"];
      applyThemeWithRipple(variables, origin, rippleColor);
    } else {
      applyThemeVariables(variables);
    }

    set({ colorTheme: themeId });
  },
}));

// Apply initial theme on load (before React renders)
const initialMode = getInitialMode();
const initialColorTheme = getInitialColorTheme();
document.documentElement.setAttribute("data-theme", initialMode);
applyThemeVariables(getThemeVariables(initialColorTheme, initialMode));

export default useQuestionsStore;
