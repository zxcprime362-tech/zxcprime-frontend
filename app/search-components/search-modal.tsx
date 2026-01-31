"use client";
import { Input } from "@/components/ui/input";
import { Check, Search } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
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

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  ) as T;

  return debouncedCallback;
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lastRoute, setLastRoute] = useState("/");
  const [value, setValue] = useState(searchParams.get("type") || "movie");
  const [text, setText] = useState(searchParams.get("query") || "");
  console.log("lastRoute", lastRoute);
  // Debounced search to update URL as user types
  const debouncedSearch = useDebounce(
    (searchText: string, mediaType: string) => {
      if (!searchText.trim()) {
        // If input is cleared, go back to last route
        router.push(lastRoute);
        return;
      }

      const params = new URLSearchParams();
      params.set("type", mediaType);
      params.set("query", searchText);

      router.push(`/search?${params.toString()}`);
    },
    100,
  );

  // Update URL when text changes

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    debouncedSearch(newText, value);
  };

  const handleTypeChange = (newType: string) => {
    setValue(newType);
    debouncedSearch(text, newType);
    setOpen(false);
  };
  useEffect(() => {
    if (
      !pathname.startsWith("/search") &&
      !pathname.startsWith("/details") &&
      !pathname.startsWith("/watch")
    ) {
      setLastRoute(pathname);
    }
  }, [pathname]);
  return (
    <div className="lg:relative fixed top-4 z-30 flex items-center bg-background/30 rounded-md backdrop-blur-md lg:w-auto w-[95%] lg:top-0 lg:left-0 lg:translate-x-0 left-1/2 -translate-x-1/2">
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
