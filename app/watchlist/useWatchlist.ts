import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface WatchlistItem {
  id: number;
  media_type: string;
  backdrop: string;
  title: string;
  year: string;
}
interface WatchlistState {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (item: WatchlistItem) =>
        set((state) => {
          if (state.watchlist.some((i) => i.id === item.id)) return state;
          return { watchlist: [...state.watchlist, item] };
        }),

      removeFromWatchlist: (id: number) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item.id !== id),
        })),

      isInWatchlist: (id: number) =>
        get().watchlist.some((item) => item.id === id),

      clearWatchlist: () => set({ watchlist: [] }),
    }),
    {
      name: "watchlist-storage",
    },
  ),
);
