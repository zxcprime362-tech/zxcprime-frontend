"use client";

import useMusicSearch from "@/hook-music/search";
import { usePlayerStore } from "@/store-music/usePlayerStore";
import { Activity } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MusicSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const media_type = searchParams.get("type") || "";
  const isMusic = media_type === "music";
  const { data: search_result } = useMusicSearch({
    search: query,
    enable: isMusic,
  });
  const setPlaying = usePlayerStore((state) => state.setPlaying);
  return (
    <div className="relative py-20 lg:w-[85%] w-[95%] mx-auto min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md">
        <Activity className="size-12 text-primary" />{" "}
        {/* optional: added text-primary for icon color */}
        <h1 className="text-xl font-semibold tracking-tight">
          No music playing yet
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Start by searching for songs or artists. Soon you'll be able to create
          and save custom playlists too!
        </p>
      </div>
    </div>
  );
}
