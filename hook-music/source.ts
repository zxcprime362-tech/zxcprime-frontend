"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface TidalTrackManifestResponse {
  version: string;
  data: TidalTrackManifestData;
}

export interface TidalTrackManifestData {
  trackId: number;
  assetPresentation: AssetPresentation;
  audioMode: AudioMode;
  audioQuality: AudioQuality;
  manifestMimeType: string;
  manifestHash: string;
  manifest: string; // Base64-encoded DASH MPD XML
  albumReplayGain: number;
  albumPeakAmplitude: number;
  trackReplayGain: number;
  trackPeakAmplitude: number;
  bitDepth: number;
  sampleRate: number;
}
export type AssetPresentation = "FULL" | "PREVIEW";

export type AudioMode = "STEREO" | "DOLBY_ATMOS" | "SONY_360RA";

export type AudioQuality =
  | "LOW"
  | "HIGH"
  | "LOSSLESS"
  | "HI_RES"
  | "HIRES_LOSSLESS"
  | "HI_RES_LOSSLESS";
export default function useMusicSource({ id }: { id: number | null }) {
  const query = useQuery<TidalTrackManifestResponse>({
    queryKey: ["search-title-music-source", id],
    enabled: !!id,
    queryFn: async () => {
      const url = `zxcprime-backend/music/source?id=${id}`;

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
