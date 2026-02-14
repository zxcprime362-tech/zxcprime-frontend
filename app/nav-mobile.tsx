import {
  Activity,
  Bookmark,
  Film,
  GalleryVerticalEnd,
  House,
  ListChevronsUpDown,
  Search,
  Settings,
  Telescope,
  Tv,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { IconDeviceIpadDown } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import SearchModal from "./search-components/search-modal";
import { useState } from "react";

export default function MobileNavBar({ lastRoute }: { lastRoute: string }) {
  const [search, setSearch] = useState(false);
  const pathname = usePathname();
  return (
    <div className="fixed   inset-x-0 bottom-0 z-40  lg:hidden block p-4  bg-background/80 backdrop-blur-lg rounded-t-md border-t space-y-4">
      {search && <SearchModal lastRoute={lastRoute} />}
      <div className="flex justify-center items-center    gap-8  w-full text-muted-foreground">
        <button
          className={`flex items-center justify-center flex-col gap-1 ${pathname === "/" ? "text-foreground" : ""}`}
        >
          <Link href={`/`}>
            <House className="size-6 " strokeWidth={1.8} />
          </Link>
          <h1 className="text-xs tracking-wide font-medium">Home</h1>
        </button>

        <button
          className={`flex items-center justify-center flex-col gap-1 ${pathname === "/movie" ? "text-foreground" : ""}`}
        >
          <Link href={`/movie`}>
            <Film className="size-6 " strokeWidth={1.8} />
          </Link>
          <h1 className="text-xs tracking-wide font-medium">Movie</h1>
        </button>
        <button
          className={`flex items-center justify-center flex-col gap-1 ${pathname === "/tv" ? "text-foreground" : ""}`}
        >
          <Link href={`/tv`}>
            <Tv className="size-6 " strokeWidth={1.8} />
          </Link>
          <h1 className="text-xs tracking-wide font-medium">TV Show</h1>
        </button>

        <button
          className={`flex items-center justify-center flex-col gap-1 ${pathname === "/settings" ? "text-foreground" : ""}`}
          onClick={() => setSearch((prev) => !prev)}
        >
          <Search
            className="size-6 hover:rotate-90 duration-500 transition"
            strokeWidth={1.8}
          />

          <h1 className="text-xs tracking-wide font-medium">Search</h1>
        </button>

        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`flex  items-center justify-center flex-col gap-1 ${pathname === "/watchlist" ? "text-foreground" : pathname === "/history" ? "text-foreground" : ""}`}
            >
              <ListChevronsUpDown className="size-6 " strokeWidth={1.8} />

              <h1 className={`text-xs tracking-wide font-medium  `}>More</h1>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="grid grid-cols-1 gap-1 p-2 border-0 w-45"
          >
            <Button variant="secondary" asChild>
              <Link href={`/music`}>
                <Activity /> Music (Beta)
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/settings`}>
                <Bookmark /> Settings
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/watchlist`}>
                <Bookmark /> Watchlist
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/history`}>
                <GalleryVerticalEnd /> History
              </Link>
            </Button>{" "}
            <Button variant="secondary" asChild className="">
              <Link href={`/install-pwa`}>
                <IconDeviceIpadDown /> Install App
              </Link>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
