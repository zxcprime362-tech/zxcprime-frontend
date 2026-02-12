import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Subtitle {
  id: string;
  url: string;
  language: string;
  display: string;
  format: "srt";
  isHearingImpaired?: boolean;
  flagUrl?: string;
  source?: string;
  label: string;
  file: string;
}

interface UseSubtitlesParams {
  tmdbId?: string;
  imdbId?: string;
  season?: number; // optional for movies
  episode?: number; // optional for movies
  media_type: string;
}

export function useSubtitles({
  tmdbId,
  imdbId,
  season,
  episode,
  media_type,
}: UseSubtitlesParams) {
  return useQuery<Subtitle[], Error>({
    queryKey: ["subtitles", tmdbId, imdbId, season, episode],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (tmdbId) params.set("tmdbId", tmdbId);
      if (imdbId) params.set("imdbId", imdbId);
      if (season) params.set("season", String(season));
      if (episode) params.set("episode", String(episode));

      const { data } = await axios.get(`/api/subtitles?${params.toString()}`);

      return data;
    },
    enabled: !!imdbId || !!tmdbId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
