"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MovieTypes } from "@/types/movie-by-id";
import { useDebounce } from "@/lib/debounder";
export interface TidalTracksResponse {
  version: string;
  data: TidalTracksData;
}
export interface TidalTracksData {
  limit: number;
  offset: number;
  totalNumberOfItems: number;
  items: Track[];
}
export interface Track {
  id: number;
  title: string;
  duration: number;
  replayGain: number;
  peak: number;
  allowStreaming: boolean;
  streamReady: boolean;
  payToStream: boolean;
  adSupportedStreamReady: boolean;
  djReady: boolean;
  stemReady: boolean;
  streamStartDate: string; // ISO string
  premiumStreamingOnly: boolean;
  trackNumber: number;
  volumeNumber: number;
  version: string | null;
  popularity: number;
  copyright: string;
  bpm: number;
  key: string | null;
  keyScale: string | null;
  url: string;
  isrc: string;
  editable: boolean;
  explicit: boolean;
  audioQuality: AudioQuality;
  audioModes: AudioMode[];
  mediaMetadata: MediaMetadata;
  upload: boolean;
  accessType: string | null;
  spotlighted: boolean;
  artist: Artist;
  artists: Artist[];
  album: Album;
  mixes: Record<string, unknown>;
}
export interface Artist {
  id: number;
  name: string;
  handle: string | null;
  type: ArtistType;
  picture: string | null;
}
export interface Album {
  id: number;
  title: string;
  cover: string | null;
  vibrantColor: string | null;
  videoCover: string | null;
} // Media metadata
export interface MediaMetadata {
  tags: MediaTag[];
}

// Enums / unions
export type AudioQuality =
  | "LOW"
  | "HIGH"
  | "LOSSLESS"
  | "HI_RES"
  | "HIRES_LOSSLESS";

export type AudioMode = "STEREO" | "DOLBY_ATMOS" | "SONY_360RA";

export type MediaTag =
  | "LOSSLESS"
  | "HIRES_LOSSLESS"
  | "DOLBY_ATMOS"
  | "SONY_360RA";

export type ArtistType = "MAIN" | "FEATURED" | "CONTRIBUTOR";
export default function useMusicSearch({
  search,
  enable,
}: {
  search: string;
  enable?: boolean;
}) {
  const query = useQuery<TidalTracksResponse>({
    queryKey: ["search-title-music", search],
    enabled: !!search && enable,
    queryFn: async () => {
      const url = `
https://tidal-api.binimum.org/search/?s=${search}`;

      try {
        const res = await axios.get(url);

        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return query;
}
