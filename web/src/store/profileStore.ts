import { Profile } from "@/graphql/types/graphql";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IProfileStoreState {
  profile: Profile | null;
}

interface IProfileStoreActions {
  setProfile: (profile: Profile | null) => void;
}

interface IProfileStore {
  actions: IProfileStoreActions;
  state: IProfileStoreState;
}

export const useProfileStore = create<IProfileStore>()(
  persist(
    (set) => ({
      actions: {
        setProfile: (profile: Profile | null) =>
          set((prev) => ({ ...prev, state: { ...prev.state, profile } })),
      },
      state: {
        profile: null,
      },
    }),
    {
      name: "gql-chat:profileStore",
      merge: (persistedState: unknown, initial: IProfileStore) => {
        const persisted = persistedState as IProfileStore;
        return {
          ...initial,
          state: initial.state
            ? { ...initial.state, profile: persisted.state.profile }
            : persisted.state,
        };
      },
    },
  ),
);
