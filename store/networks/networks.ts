import { create } from "zustand";
import { NetworkStore } from "../types/network";

const useNetworkStore = create<NetworkStore>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
