import { create } from "zustand";

interface PlayerState {
  id: number | null;
  title: string | null;
  artist: string | null;
  cover: string | null;
  setPlaying: (track: {
    id: number | null;
    title: string | null;
    artist: string | null;
    cover: string | null;
  }) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  id: null,
  title: null,
  artist: null,
  cover: null,

  setPlaying: (track) =>
    set({
      id: track.id,
      title: track.title,
      artist: track.artist,
      cover: track.cover,
    }),

  reset: () =>
    set({
      id: null,
      title: null,
      artist: null,
      cover: null,
    }),
}));
