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
      name: "gql-chat:generalStore",
      merge: (persistedState: unknown, initial: IGeneralStore) => {
        const persisted = persistedState as IGeneralStore;
        return {
          ...initial,
          state: initial.state
            ? { ...initial.state, modal: persisted.state.modal }
            : persisted.state,
        };
      },
    },
  ),
);
