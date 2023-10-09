import { create } from "zustand";

type TDarkModeState = {
  darkMode: boolean;
};

type TDarkModeActions = {
  toggleDarkMode: () => void;
};

interface IDarkModeStore {
  state: TDarkModeState;
  actions: TDarkModeActions;
}

export const useDarkModeStore = create<IDarkModeStore>((set, get, actions) => ({
  state: {
    darkMode: true,
  },
  actions: {
    toggleDarkMode: () => {
      set((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          darkMode: !prev.state.darkMode,
        },
      }));
    },
  },
}));
