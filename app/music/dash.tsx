"use client";

import { useEffect, useRef, useState } from "react";
import * as dashjs from "dashjs";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";
import useMusicSource from "@/hook-music/source";
import { usePlayerStore } from "@/store-music/usePlayerStore";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import {
  IconArrowsShuffle,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconRepeat,
  IconX,
} from "@tabler/icons-react";

interface Props {
  id: number | null;
  title: string | null;
  artist: string | null;
  cover: string | null;
}

export default function AudioPlayer({ id, title, artist, cover }: Props) {
  const { data: music, isLoading } = useMusicSource({ id });
  const [repeat, setRepeat] = useState(false);
  const manifestBase64 = music?.data?.manifest;
  const manifestMimeType = music?.data?.manifestMimeType;

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const setPlaying = usePlayerStore((state) => state.setPlaying);
  useEffect(() => {
    if (!manifestBase64 || !manifestMimeType || !audioRef.current) return;

    const audio = audioRef.current;
    const decoded = atob(manifestBase64);

    let player: dashjs.MediaPlayerClass | null = null;

    if (manifestMimeType.includes("dash+xml")) {
      player = dashjs.MediaPlayer().create();
      player.initialize(
        audio,
        URL.createObjectURL(
          new Blob([decoded], { type: "application/dash+xml" }),
        ),
        true,
      );
    } else if (manifestMimeType.includes("bts")) {
      try {
        const flacJson = JSON.parse(decoded);
        const flacUrl = flacJson.urls?.[0];
        if (flacUrl) {
          audio.src = flacUrl;
          audio.load();
          audio.play().catch((err) => console.warn("Autoplay blocked", err));
        }
      } catch (err) {
        console.error("Failed to parse BTS manifest:", err);
      }
    }

    return () => {
      // Cleanup dash player
      if (player) {
        try {
          player.reset(); // safely removes SourceBuffers
        } catch (e) {
          console.warn("Failed to reset DASH player:", e);
        }
        player = null;
      }
      // Stop audio element
      audio.pause();
      audio.src = "";
    };
  }, [manifestBase64, manifestMimeType]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);

      // Reset store when track ends
      setPlaying({
        id: null,
        title: null,
        artist: null,
        cover: null,
      });
    };
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  const seek = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
  };

  const changeVolume = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.volume = value[0] / 100;
    setVolume(value[0]);
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 p-6  backdrop-blur-md bg-background/50 border-t rounded-t-md">
      <button
        className="absolute right-0 top-0 p-4"
        onClick={() =>
          setPlaying({
            id: null,
            title: null,
            artist: null,
            cover: null,
          })
        }
      >
        <IconX className="size-5" />
      </button>
      <div className="relative flex justify-between items-center max-w-[95%] mx-auto">
        <audio autoPlay={true} ref={audioRef} />
        <div className="flex gap-3 items-end">
          <img
            className="size-15 rounded-md"
            src={
              cover
                ? `https://resources.tidal.com/images/${cover.replace(/-/g, "/")}/320x320.jpg`
                : undefined
            }
            alt=""
          />
          <div>
            <h1>{title}</h1>
            <h3 className="text-sm text-gray-300">{artist}</h3>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2  max-w-lg w-full flex-1">
          <div className="flex items-center gap-3 text-base text-gray-300">
            {formatTime(currentTime)}
            <Slider
              value={[currentTime]}
              max={duration || 1}
              step={1}
              onValueChange={seek}
              className="flex-1"
            />
            {formatTime(duration)}
          </div>
          <div className="flex items-center justify-center gap-6 mt-2 text-gray-200">
            <button>
              <IconRepeat />
            </button>
            <button>
              <IconPlayerSkipBackFilled />
            </button>
            {isLoading ? (
              <Tailspin size="36" stroke="7" speed="0.9" color="white" />
            ) : (
              <button onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="fill-current size-9" />
                ) : (
                  <Play className="fill-current size-9" />
                )}
              </button>
            )}
            <button>
              <IconPlayerSkipForwardFilled />
            </button>
            <button>
              <IconArrowsShuffle />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="group flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-32">
            <button className="size-6 opacity-50 group-hover:opacity-100">
              <Volume2 />
            </button>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={changeVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
