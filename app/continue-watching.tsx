import { Button } from "@/components/ui/button";
import SkeletonCard1 from "@/components/ui/movie-card-skeleton-1";
import { Film, PenLine, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "motion/react";
import { useVideoProgressStore } from "@/store-player/videoProgressStore";
import { swiperConfigBackdrop } from "@/lib/swiper-config-backdrop";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { IconEdit, IconPencil, IconTrashXFilled } from "@tabler/icons-react";
export default function ContinueWatching() {
  const [clear, setClear] = useState(false);
  const clearProgress = useVideoProgressStore((state) => state.clearProgress);
  const progressList = Object.values(
    useVideoProgressStore((state) => state.progress),
  ).sort((a, b) => b.lastUpdated - a.lastUpdated);
  const [loaded, setLoaded] = useState(false);
  return (
    progressList.length !== 0 && (
      <div className=" mx-auto lg:w-[85%] w-[95%]  relative lg:py-15 py-8  border-b">
        <div className="p-1 lg:mb-3  flex justify-between items-center gap-6">
          <h2 className="lg:text-2xl text-base font-semibold  montserrat tracking-wide lg:mb-1 line-clamp-1">
            Continue Watching
          </h2>
          <button onClick={() => setClear((prev) => !prev)}>
            <IconPencil className="size-7" />
          </button>
        </div>
        <Swiper {...swiperConfigBackdrop}>
          {progressList.map((movie, i) => {
            const key =
              movie.media_type === "movie"
                ? `movie-${movie.id}`
                : `tv-${movie.id}-s${movie.season}-e${movie.episode}`;
            return (
              <SwiperSlide key={i} className="p-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: i * 0.03,
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  className="relative"
                >
                  <div className="relative group p-px  bg-linear-to-b hover:to-red-800 from-transparent active:scale-98 active:from-red-800 transition duration-150 rounded-sm ">
                    <div className="aspect-video    transition cursor-pointer relative  rounded-sm overflow-hidden">
                      <Link
                        href={`/watch/${movie.media_type}/${movie.id}${movie.media_type === "tv" ? `/${movie.season}/${movie.episode}` : ""}`}
                      >
                        {" "}
                        <img
                          src={`${IMAGE_BASE_URL}/w780${movie.backdrop}`}
                          alt={movie.title}
                          className={`w-full h-full object-cover transition-opacity duration-300  ${loaded ? "opacity-100 " : "opacity-0"}`}
                          onLoad={() => setLoaded(true)}
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/50 opacity-0 group-hover:opacity-100 transition duration-150"></div>
                      </Link>
                      {clear && (
                        <AlertDialog>
                          <AlertDialogTrigger
                            asChild
                            className="absolute inset-0 bg-linear-to-b from-transparent  to-background  transition duration-150 flex items-end justify-center"
                          >
                            <button className=" flex items-center gap-2 p-2">
                              <TrashIcon className="size-5 fill-current text-muted-foreground" />{" "}
                              <h1>Remove</h1>
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete {movie.title}{" "}
                                {movie.media_type === "tv"
                                  ? `S${movie.season}E${movie.episode}`
                                  : ""}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete from history.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => clearProgress(key)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={[movie.currentTime]}
                      max={movie.duration}
                      step={1}
                      className="mx-auto w-full max-w-xs pointer-events-none"
                    />
                    <h1 className="lg:text-sm text-xs  font-normal truncate">
                      {movie.title}{" "}
                      {movie.media_type === "tv"
                        ? `(S${movie.season}E${movie.episode})`
                        : ""}
                    </h1>
                    {/* <p className="text-xs text-muted-foreground">{movie.}</p> */}
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    )
  );
}
