// components/WatchlistButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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

import Link from "next/link";
import { IconGhost2Filled, IconTrashFilled, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useWatchlistStore } from "./useWatchlist";
export default function Watchlist() {
  const [clear, setShowMinus] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const watchlist = useWatchlistStore((state) => state.watchlist);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlistStore();
  return (
    <div className="lg:w-[85%] lg:py-25 py-15  w-[95%]   mx-auto">
      <div className="fixed lg:bottom-10 bottom-18 lg:right-10 right-4">
        <Button
          size="xl"
          variant="destructive"
          className="rounded-full lg:size-13 size-11"
          onClick={() => setShowMinus((prev) => !prev)}
        >
          {clear ? (
            <IconX className="size-6" />
          ) : (
            <IconTrashFilled className="size-6" />
          )}
        </Button>
      </div>
      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full p-4">
          <span>
            <IconGhost2Filled className="size-10 animate-bounce" />
          </span>
          <h3 className="lg:text-2xl text-center font-bold mb-2 mt-3 bg-linear-to-t from-zinc-500 to-white bg-clip-text text-transparent">
            Your Watchlist is empty
          </h3>

          <p className="text-sm text-muted-foreground text-center">
            Add your favorite show to easily find and watch them later.
          </p>
          <Button size="lg" asChild className="mt-6" variant="outline">
            <Link href="/">
              Home <ArrowRight />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className=" uppercase  mask-[linear-gradient(to_bottom,black_0%,transparent_85%)] lg:text-6xl text-4xl font-bold text-red-700  translate-y-3 lg:tracking-tight ">
            WATCHLIST
          </h1>
          <div className="grid gap-3 lg:grid-cols-5 grid-cols-2">
            {watchlist.map((meow, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: idx * 0.03,
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  className="relative group overflow-hidden rounded-md active:scale-98"
                >
                  <Link href={`/details/${meow.media_type}/${meow.id}`}>
                    <div className="relative  p-px rounded-md bg-linear-to-b group-hover:to-red-800 from-transparent   transition duration-150 overflow-hidden">
                      <div className="aspect-video   rounded-md  transition cursor-pointer overflow-hidden relative ">
                        <img
                          src={`${IMAGE_BASE_URL}/w780${meow.backdrop}`}
                          alt={meow.title}
                          className={`w-full h-full object-cover transition-opacity duration-300  ${loaded ? "opacity-100 " : "opacity-0"}`}
                          onLoad={() => setLoaded(true)}
                        />

                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/50 opacity-0 group-hover:opacity-100 transition duration-150"></div>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      <h1 className="lg:text-sm text-xs  font-normal truncate">
                        {meow.title}{" "}
                      </h1>
                      {/* <p className="text-xs text-muted-foreground">{movie.}</p> */}
                    </div>
                  </Link>{" "}
                  <AlertDialog>
                    <AnimatePresence>
                      {clear && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-0 right-0"
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              className=" backdrop-blur-2xl cursor-pointer rounded-none rounded-bl-lg"
                              variant="destructive"
                            >
                              <IconTrashFilled className="size-5" />
                            </Button>
                          </AlertDialogTrigger>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {meow.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete from watchlist.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => removeFromWatchlist(meow.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
