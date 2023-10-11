import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TModal = "CreateServer";

interface IGeneraStoreState {
  modal: TModal | null;
}

interface IGeneralStoreActions {
  setActiveModal: (modal: TModal | null) => void;
}

interface IGeneralStore {
  state: IGeneraStoreState;
  actions: IGeneralStoreActions;
}

export const useGeneralStore = create<IGeneralStore>()(
  persist(
    (set) => ({
      actions: {
        setActiveModal: (modal: TModal | null) =>
          set((prev) => ({ ...prev, state: { ...prev.state, modal } })),
      },
      state: {
        modal: null,
      },
    }),
    {
      name: "generalStore",
    },
  ),
);
