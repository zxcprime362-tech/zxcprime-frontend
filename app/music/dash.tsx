// "use client";

// import { useEffect, useRef } from "react";
// import * as dashjs from "dashjs";

// interface Props {
//   manifestBase64: string;
//   manifestMimeType: string;
// }

// export default function AudioPlayer({
//   manifestBase64,
//   manifestMimeType,
// }: Props) {
//   const audioRef = useRef<HTMLAudioElement>(null);

//   useEffect(() => {
//     if (!manifestBase64 || !audioRef.current) return;

//     // Decode Base64
//     const decoded = atob(manifestBase64);

//     if (manifestMimeType.includes("dash+xml")) {
//       // DASH HI-RES
//       const player = dashjs.MediaPlayer().create();
//       player.initialize(
//         audioRef.current,
//         URL.createObjectURL(
//           new Blob([decoded], { type: "application/dash+xml" }),
//         ),
//         true,
//       );
//     } else if (manifestMimeType.includes("bts")) {
//       // LOSSLESS FLAC
//       try {
//         const flacJson = JSON.parse(decoded);
//         const flacUrl = flacJson.urls?.[0];
//         if (flacUrl) audioRef.current.src = flacUrl;
//       } catch (err) {
//         console.error("Failed to parse BTS manifest:", err);
//       }
//     }
//   }, [manifestBase64, manifestMimeType]);

//   return (
//     <audio autoPlay={true} ref={audioRef} controls className="w-full rounded" />
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import * as dashjs from "dashjs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";

interface Props {
  manifestBase64: string;
  manifestMimeType: string;
  title: string | null;
  artist: string | null;
  cover: string | null;
}

export default function AudioPlayer({
  manifestBase64,
  manifestMimeType,
  title,
  artist,
  cover,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (!manifestBase64 || !audioRef.current) return;

    const decoded = atob(manifestBase64);

    if (manifestMimeType.includes("dash+xml")) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(
        audioRef.current,
        URL.createObjectURL(
          new Blob([decoded], { type: "application/dash+xml" }),
        ),
        true,
      );
    } else if (manifestMimeType.includes("bts")) {
      try {
        const flacJson = JSON.parse(decoded);
        const flacUrl = flacJson.urls?.[0];
        if (flacUrl && audioRef.current) {
          const audio = audioRef.current;
          audio.src = flacUrl;

          audio.load();

          audio
            .play()
            .then(() => {
              // autoplay success
            })
            .catch((err) => {
              // autoplay blocked (normal on some browsers)
              console.warn(
                "Autoplay blocked, waiting for user interaction",
                err,
              );
            });
        }
      } catch (err) {
        console.error("Failed to parse BTS manifest:", err);
      }
    }
  }, [manifestBase64, manifestMimeType]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
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
    <div className="fixed bottom-0 inset-x-0 z-30 p-6 bg-background/90 backdrop-blur-2xl border-t rounded-t-md">
      <div className="flex justify-between items-center max-w-[95%] mx-auto">
        <audio autoPlay={true} ref={audioRef} />
        <div className="flex gap-3 items-end">
          <img className="size-15 rounded-md" src={cover ?? ""} alt="" />
          <div>
            <h1>{title}</h1>
            <h3 className="text-sm text-muted-foreground">{artist}</h3>
          </div>
        </div>
        <div className="flex-1 max-w-lg">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
          <div className="flex items-center gap-2 justify-center mt-2">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="fill-current" />
              ) : (
                <Play className="fill-current" />
              )}
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
