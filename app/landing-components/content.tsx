import { Button } from "@/components/ui/button";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { MovieTypes } from "@/types/movie-by-id";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hook/use-mobile";

import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { usePathname } from "next/navigation";
import { useWatchlistStore } from "../watchlist/useWatchlist";
import WatchlistButton from "../watchlist/watchlist-button";
import { useLandingTrailer } from "@/store/useLandingTrailer";
export default function LandingContent({
  isSearching,
  isActive,
  data,
  custom_image,
  custom_logo,
  media_type,
  isNext,
  isPrev,
}: {
  isSearching: boolean;
  isActive: boolean;
  isNext: boolean;
  isPrev: boolean;
  data: MovieTypes;
  custom_image?: string;
  custom_logo?: string;
  media_type: string;
}) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const playerRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trailerError, setTrailerError] = useState(false);
  const [muted, setMuted] = useState(true);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlistStore();
  const landingTrailer = useLandingTrailer((state) => state.landingTrailer);
  const inWatchlist = isInWatchlist(data.id);
  const logo = useMemo(
    () => data.images?.logos?.find((l) => l.iso_639_1 === "en")?.file_path,
    [data.images?.logos],
  );
  const trailerKey = data.videos.results.find(
    (f) => f.type === "Trailer" && f.official === true,
  )?.key;

  useEffect(() => {
    if (
      playing &&
      pathname !== "/" &&
      pathname !== "/movie" &&
      pathname !== "/tv"
    ) {
      setPlaying(false);
    }
  }, [pathname, playing]);

  useEffect(() => {
    if (!isActive || trailerError || landingTrailer === "off") {
      setPlaying(false);
      return;
    }

    setPlaying(false);
    const timer = setTimeout(() => {
      setPlaying(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isActive, trailerError, trailerKey, landingTrailer]);
  useEffect(() => {
    console.log("PLAYING CHANGED:", playing);
  }, [playing]);

  return (
    <div
      className={`relative overflow-hidden bg-background transition-[max-height] duration-300 ease-out lg:h-screen h-[70vh]
    ${isSearching ? "max-h-0" : "lg:max-h-screen max-h-[70vh]"}`}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="relative overflow-hidden w-full grid place-items-center   lg:h-screen h-[70vh]  lg:mask-[linear-gradient(to_left,black_40%,transparent_100%)]
               mask-size-[100%_100%]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {loaded && landingTrailer === "on" && (
              <ReactPlayer
                key={data.id}
                ref={playerRef}
                src={`https://www.youtube.com/embed/${trailerKey}`}
                loop={false}
                width="130%"
                height="130%"
                playing={playing}
                muted={muted}
                onEnded={() => {
                  console.log("Ended");

                  setPlaying(false);
                }}
                onError={() => {
                  console.log("ERROR");
                  setTrailerError(true);
                }}
                className="bg-black pointer-events-none"
              />
            )}
            <AnimatePresence>
              {!playing && (
                <motion.img
                  key="backdrop"
                  src={`${IMAGE_BASE_URL}/original${
                    custom_image ? custom_image : data.backdrop_path
                  }`}
                  alt={data.title || data.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: loaded ? 1 : 0 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      delay: 0.4,
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute object-cover w-full h-full"
                  onLoad={() => setLoaded(true)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/*IMAGE */}

      <div className="absolute inset-0 bg-linear-to-b lg:from-transparent from-background/80 via-transparent to-background pointer-events-none " />

      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="absolute flex items-center  lg:bottom-25 bottom-0 left-1/2 -translate-x-1/2 lg:w-[85%] w-[95%]  "
        >
          <div className="lg:max-w-[45%] ">
            {isActive && (
              <div className="lg:mb-8 mb-3 lg:max-w-lg max-w-58   overflow-hidden">
                {data.images.logos.length === 0 ? (
                  <h1 className="lg:text-6xl text-4xl  font-bold">
                    {data.title || data.name}
                  </h1>
                ) : (
                  <img
                    src={`${IMAGE_BASE_URL}/w780${
                      custom_logo ? custom_logo : logo
                    }`}
                    alt={data.title || data.name}
                    className=" w-full lg:max-h-60 max-h-30 object-contain object-left"
                  />
                )}
              </div>
            )}

            <motion.div
              initial={false}
              animate={{
                height: playing ? "0" : "auto",
              }}
              transition={{
                delay: 0.5,
                duration: 0.3,
                ease: "easeOut",
              }}
              className="overflow-hidden"
            >
              {isActive && (
                <div className="flex items-center lg:gap-6 gap-3 lg:mb-8 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="lg:text-2xl text-lg font-semibold  ">
                      {data.vote_average.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">/ 10</div>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div className="text-muted-foreground">
                    {new Date(
                      data.release_date || data.first_air_date,
                    ).getFullYear()}
                  </div>
                </div>
              )}

              {isActive && (
                <p className="text-muted-foreground leading-relaxed lg:mb-10 mb-5 lg:line-clamp-4 line-clamp-2 lg:text-lg text-sm">
                  {data.overview}
                </p>
              )}
            </motion.div>

            <AnimatePresence>
              {isActive && (
                <div className="flex lg:gap-4 gap-3 items-center">
                  <Button
                    asChild
                    size="xl"
                    variant="accent"
                    className="active:scale-95"
                  >
                    <Link
                      href={`/details/${media_type}/${data.id}`}
                      scroll={false}
                      prefetch={false}
                    >
                      <Play className=" fill-current" /> Play Now
                    </Link>
                  </Button>

                  <WatchlistButton movie={data} media_type={media_type} />
                  {/* <Button
                    size="xl"
                    variant="outline"
                    onClick={() =>
                      inWatchlist
                        ? removeFromWatchlist(data.id)
                        : addToWatchlist({
                            id: data.id,
                            media_type: media_type,
                            backdrop: "",
                            title: data.title,
                            year: "",
                          })
                    }
                  >
                    {inWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
                  </Button> */}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {!trailerError && playing && isActive && (
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="fixed  lg:bottom-25 bottom-2 right-0 lg:pl-4 pl-2 lg:pr-12 pr-8 border-l-2 border-red-600 py-0.5"
        >
          <span className="active:scale-95" onClick={() => setMuted((m) => !m)}>
            {muted ? (
              <VolumeX className="lg:size-8 size-6" />
            ) : (
              <Volume2 className="lg:size-8 size-6" />
            )}
          </span>
        </motion.div>
      )}
    </div>
  );
}
