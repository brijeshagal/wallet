import { Account } from "@/types/wallet/account";
import { zustandAsyncStorage } from "@/utils/store/save-data/async";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CurrentStore } from "../../types/store/current";

export const useCurrentStore = create<CurrentStore>()(
  persist(
    (set) => ({
      chainId: 42161,
      accounts: {},
      activeId: "",
      userId: "",
      twitterId: "",
      twitterUsername: "",
      setTwitter: (id: string, username: string) =>
        set({ twitterUsername: username, twitterId: id }),
      setUserId: (userId: string) => set({ userId }),
      addAndSetNewAccount: (account: Account) =>
        set((state) => {
          const acc = state.accounts;
          acc[account.id] = account;
          return {
            accounts: acc,
            activeId: account.id,
          };
        }),
      setChainId: (chainId: number) => set({ chainId }),
      setActiveId: (activeId: string) => set({ activeId }),
      updateAllAccounts: (accounts: Record<string, Account>) =>
        set(() => ({
          accounts,
        })),
      updateAccount: (account: Account) =>
        set((state) => ({
          accounts: { ...state.accounts, [account.id]: account },
        })),
    }),
    {
      name: "current-state-storage",
      storage: createJSONStorage(() => zustandAsyncStorage),
    }
  )
);
