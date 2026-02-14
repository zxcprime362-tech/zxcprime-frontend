"use client";
import { Input } from "@/components/ui/input";
import { Check, Search } from "lucide-react";
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
    enable: isPopUp,
  });

  const results = useMemo(
    () => data?.pages.flatMap((p) => p.results) ?? [],
    [data],
  );

  return (
    <div className="relative">
      {isPopUp && (
        <div
          onClick={() => router.push(lastRoute)}
          className="fixed inset-0 w-full mt-3 bg-background/50"
        ></div>
      )}
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

      {isPopUp && (
        <div className="absolute max-h-117 bg-background/80 backdrop-blur-md w-full lg:mt-3 mb-3 z-10 overflow-auto custom-scrollbar p-1 rounded-md border bottom-full lg:top-full lg:bottom-[unset]">
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
                >
                  <div className="  p-2 flex gap-3 items-end w-full ">
                    <div className="max-w-30 aspect-16/10">
                      <img
                        src={`https://image.tmdb.org/t/p/w780${m.backdrop_path}`}
                        alt=""
                        className="h-full w-full rounded-xs object-cover"
                      />
                    </div>
                    <div className="flex-1 ">
                      <h1 className="font-medium line-clamp-1 text-foreground ">
                        {title}
                      </h1>
                      <p className="  text-sm text-muted-foreground">
                        {genre?.name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
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
];
