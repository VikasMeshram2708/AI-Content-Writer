/**
 * zustand chat store for managing chat state
 */
import { create } from "zustand";

type ChatStoreState = {
  showSummary: boolean;
  enableSummary: () => void;
};

export const useChatStore = create<ChatStoreState>((set) => ({
  showSummary: false,
  enableSummary: () => set({ showSummary: true }),
}));
