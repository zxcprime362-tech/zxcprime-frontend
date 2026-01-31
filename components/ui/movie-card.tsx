import { IMAGE_BASE_URL } from "@/constants/tmdb";
import useHoverSound from "@/hook/sound-hover-hook";
import { useAdLinkStore } from "@/store/ad-store";
import { useCardStyle } from "@/store/useCardStyle";
import { MovieTypes } from "@/types/movie-by-id";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MovieCard({
  movie,
  media_type,
}: {
  movie: MovieTypes;
  media_type: string;
}) {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const playHover = useHoverSound("/keyboard.wav");
  const style = useCardStyle((s) => s.style);
  const [loaded, setLoaded] = useState(false);
  const openAd = useAdLinkStore((s) => s.openAd);

  const date = movie.release_date ?? movie.first_air_date;
  const isRecent =
    date && Date.now() - new Date(date).getTime() <= 30 * 24 * 60 * 60 * 1000;
  const year =
    movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0];

  return (
    <Link
      href={{
        pathname: `/details/${media_type}/${movie.id}`,
        query: paramsObject,
      }}
      scroll={false}
      prefetch
      onClick={openAd}
    >
      <div
        onClick={playHover}
        className="relative group p-px rounded-sm bg-linear-to-b hover:to-red-800 from-transparent active:scale-98 active:from-red-800 transition duration-150 overflow-hidden"
      >
        {isRecent && (
          <div
            className={`absolute z-10 bottom-0 bg-linear-to-b from-red-700 to-red-900 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 lg:px-6 rounded-t-sm py-0.5 text-sm font-medium
                         `}
          >
            Recently Added
          </div>
        )}
        <div className="aspect-2/3   rounded-sm  transition cursor-pointer overflow-hidden relative ">
          {movie.poster_path && (
            <img
              src={`${IMAGE_BASE_URL}/w780${movie.poster_path}`}
              alt={movie.title}
              className={`w-full h-full object-cover transition-opacity duration-300  ${loaded ? "opacity-100 " : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
            />
          )}

          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/50 opacity-0 group-hover:opacity-100 transition duration-150"></div>
        </div>
      </div>
      {style !== "only" && (
        <div className="mt-2">
          {/* Title */}
          {(style === "title" || style === "title-year") && (
            <h1 className="lg:text-sm text-xs font-normal truncate">
              {movie.title ?? movie.name}
            </h1>
          )}

          {/* Year + rating */}
          {style === "title-year" && (
            <p className="text-xs text-muted-foreground">
              {year}
              {movie.vote_average && ` • ${movie.vote_average.toFixed(1)} ★`}
            </p>
          )}
        </div>
      )}
    </Link>
  );
}
