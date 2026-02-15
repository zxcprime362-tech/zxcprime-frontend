"use client";
import { Input } from "@/components/ui/input";
import { Check, Search } from "lucide-react";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import SpotlightBorderWrapper from "@/components/ui/border";
import { Button } from "@/components/ui/button";
import { IconCaretUpDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import useSearch from "@/hook/get-search";
import { MovieTypes } from "@/types/movie-by-id";
import Link from "next/link";
import { movieGenres } from "@/constants/filter";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import useMusicSearch from "@/hook-music/search";
import { usePlayerStore } from "@/store-music/usePlayerStore";

export function useDebounceValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function SearchModal({ lastRoute }: { lastRoute: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const [value, setValue] = useState(searchParams.get("type") || "movie");
  const [text, setText] = useState(searchParams.get("query") || "");
  const query = searchParams.get("query");
  const isSearching = Boolean(query);
  const debouncedText = useDebounceValue(text, 400);
  const setPlaying = usePlayerStore((state) => state.setPlaying);

  const trimmedQuery = debouncedText.trim();
  const isPopUp = isSearching && lastRoute !== "/" && Boolean(trimmedQuery);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleTypeChange = (newType: string) => {
    setValue(newType);
    setOpen(false);
  };

  useEffect(() => {
    const trimmed = debouncedText.trim();

    // If empty → go back
    if (!trimmed) {
      if (pathname !== lastRoute) {
        router.replace(lastRoute);
      }
      return;
    }

    const params = new URLSearchParams();
    params.set("type", value);
    params.set("query", trimmed);

    const nextUrl = `/search?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    // Prevent pushing same URL again
    if (currentUrl !== nextUrl) {
      router.replace(nextUrl);
    }
  }, [debouncedText, value]);

  useEffect(() => {
    if (pathname === "/music" && value !== "music") {
      setValue("music");
    }
  }, [pathname]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isPending,
  } = useSearch<MovieTypes>({
    query: trimmedQuery,
    media_type: value,
    enable: isPopUp && value !== "music",
  });

  const results = useMemo(
    () => data?.pages.flatMap((p) => p.results) ?? [],
    [data],
  );
  const { data: music_result, isLoading: music_loading } = useMusicSearch({
    search: trimmedQuery,
    enable: isPopUp && value === "music",
  });

  const renderMovieResults = () => {
    if (isLoading) {
      return (
        <div className="aspect-square w-full flex justify-center items-center">
          <Tailspin size="40" stroke="5" speed="0.9" color="white" />
        </div>
      );
    }

    if (!results.length) {
      return (
        <div className="aspect-square w-full flex justify-center items-center">
          <h1 className="text-sm text-muted-foreground">No data found</h1>
        </div>
      );
    }

    return (
      <div className="grid gap-4">
        {results
          .filter((f) => f.backdrop_path)
          .map((m) => {
            const year = String(
              new Date(m.release_date || m.first_air_date).getFullYear(),
            );

            const title = m.title || m.name || "";
            const genre = movieGenres.find((g) => g.id === m.genre_ids[0]);

            return (
              <Link
                key={m.id}
                href={{
                  pathname: `/details/${value}/${m.id}`,
                  query: paramsObject,
                }}
                prefetch={false}
              >
                <div className="group relative overflow-hidden rounded-lg  hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-4">
                    {/* Poster Image */}
                    <div className="relative w-24 sm:w-25 aspect-2/3 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={`https://image.tmdb.org/t/p/w780${m.poster_path}`}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="font-semibold  line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {title}
                      </h3>

                      <div className="flex items-center gap-2 mt-2 ">
                        {genre?.name && (
                          <Badge variant="secondary">{genre.name}</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {year}
                        </span>
                      </div>

                      {m.vote_average && (
                        <div className="flex items-center gap-1 mt-2">
                          <svg
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-foreground">
                            {m.vote_average.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-5 h-5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    );
  };

  const renderMusicResults = () => {
    if (music_loading) {
      return (
        <div className="aspect-square flex justify-center items-center">
          <Tailspin size="40" stroke="5" speed="0.9" color="white" />
        </div>
      );
    }

    if (!music_result?.data?.items?.length) {
      return (
        <div className="aspect-square flex justify-center items-center">
          <h1 className="text-sm text-muted-foreground">No data found</h1>
        </div>
      );
    }

    return (
      <div className="grid gap-4">
        <div className="divide-y grid grid-cols-1">
          {music_result?.data.items.map((m) => (
            <button
              key={m.id}
              className="py-4 w-full text-left hover:bg-muted px-2 rounded flex items-end gap-3"
              onClick={() =>
                setPlaying({
                  id: m.id,
                  title: m.title,
                  artist: m.artist.name,
                  cover: m.album.cover,
                })
              }
            >
              {m.album.cover && (
                <div className="size-15 overflow-hidden rounded-sm">
                  <img
                    src={`https://resources.tidal.com/images/${m.album.cover.replace(/-/g, "/")}/320x320.jpg`}
                    alt={m.album.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div>
                <div className="font-medium">
                  {m.title}
                  {/* <span className="text-muted-foreground italic">
                  {playing.id === m.id && `  -  Playing`}
                </span> */}
                </div>
                <div className="text-sm text-muted-foreground">
                  {m.artist.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isPopUp && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              router.push(lastRoute);
            }}
            className="fixed inset-0 w-full mt-3 bg-background/50"
          />
        )}
      </AnimatePresence>
      <div className="relative flex items-center bg-background/30 rounded-md backdrop-blur-md">
        <span className="absolute left-2 flex items-center border-r pl-1 pr-2">
          <Search className="size-4 opacity-50" />
        </span>
        <SpotlightBorderWrapper>
          <Input
            value={text}
            type="search"
            placeholder={
              value === "keyword"
                ? `Search topic.. e.g. "Time Loop" `
                : value === "music"
                  ? "Search music..."
                  : value === "movie"
                    ? "Search Movie..."
                    : "Search TV Shows..."
            }
            onChange={handleTextChange}
            className="lg:w-sm w-full pr-28 pl-12 lg:text-base text-sm border-0 "
          />
        </SpotlightBorderWrapper>
        <div className="absolute top-0.5 right-0.5">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                role="combobox"
                aria-expanded={open}
                variant="outline"
                className="border-0 h-8 bg-transparent"
              >
                {media_type.find((meow) => meow.value === value)?.label}
                <IconCaretUpDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-37.5 p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandGroup>
                    {media_type.map((type) => (
                      <CommandItem
                        key={type.value}
                        value={type.value}
                        onSelect={handleTypeChange}
                      >
                        {type.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === type.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <AnimatePresence>
        {isPopUp && (
          <motion.div
            key="search-popup"
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: "80vh" }}
            exit={{ maxHeight: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute bg-background/80 backdrop-blur-md w-full lg:mt-3 mb-3 z-10 overflow-auto p-2 custom-scrollbar rounded-md bottom-full lg:top-full lg:bottom-[unset] space-y-3"
          >
            <div className="text-sm font-medium">Search result for: {text}</div>

            {value === "music" ? renderMusicResults() : renderMovieResults()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
const media_type = [
  {
    value: "movie",
    label: "Movie",
  },
  {
    value: "tv",
    label: "TV Show",
  },
  {
    value: "keyword",
    label: "Keyword",
  },
  {
    value: "music",
    label: "Music",
  },
];
