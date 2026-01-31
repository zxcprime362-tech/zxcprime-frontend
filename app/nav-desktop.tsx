import logo from "@/assets/zxczxc.svg";
import {
  Bookmark,
  ChevronDown,
  Chromium,
  Film,
  GalleryVerticalEnd,
  Home,
  Settings,
  SquareMousePointer,
  Tv,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchModal from "./search-components/search-modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import InstallButton from "@/components/ui/install";
export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 inset-x-0  z-10 bg-linear-to-b from-background/90 to-transparent rounded-b-md hidden lg:block">
      <nav className="flex items-center justify-between  w-[85%] mx-auto py-6 text-muted-foreground">
        <span className="flex gap-10 items-center">
          <span className="size-10">
            <img src={logo.src} alt="" />
          </span>
          <div className="h-6 w-0.5 rounded-full bg-border"></div>
          <button
            className={pathname === "/" ? "text-foreground font-semibold" : ""}
          >
            <Link href="/" className="flex items-center gap-1.5">
              <Home className="size-5" />
              <span className=" font-medium">Home</span>
            </Link>
          </button>
          <Popover>
            <PopoverTrigger
              asChild
              className={
                pathname === "/movie" ||
                pathname === "/tv" ||
                pathname === "/watchlist" ||
                pathname === "/history"
                  ? "text-foreground font-semibold"
                  : ""
              }
            >
              <button className="flex items-center gap-1.5 cursor-pointer">
                {pathname === "/movie" ? (
                  <Film className="size-5" />
                ) : pathname === "/tv" ? (
                  <Tv className="size-5" />
                ) : pathname === "/watchlist" ? (
                  <Bookmark className="size-5" />
                ) : pathname === "/history" ? (
                  <GalleryVerticalEnd className="size-5" />
                ) : (
                  <SquareMousePointer className="size-5" />
                )}
                <span className=" font-medium">
                  {pathname === "/movie"
                    ? "Movie"
                    : pathname === "/tv"
                      ? "TV Show"
                      : pathname === "/watchlist"
                        ? "Watchlist"
                        : pathname === "/history"
                          ? "History"
                          : "Browse"}
                </span>
                <ChevronDown className="size-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="mt-2 bg-background border-none">
              <PopoverHeader>
                <PopoverTitle>Browse</PopoverTitle>
                <PopoverDescription>
                  Discover movies, TV shows, and manage your watchlist in one
                  place.
                </PopoverDescription>
              </PopoverHeader>
              <div className="grid grid-cols-2 gap-2 mt-4 text-muted-foreground">
                <Link
                  href="/movie"
                  className={`border rounded-md p-3 ${pathname === "/movie" ? "text-foreground font-semibold" : ""}`}
                >
                  <Film />
                  <p className="text-sm font-medium mt-1.5">Movie</p>
                </Link>
                <Link
                  href="/tv"
                  className={`border rounded-md p-3 ${pathname === "/tv" ? "text-foreground font-semibold" : ""}`}
                >
                  <Tv />
                  <p className="text-sm font-medium mt-1.5">TV Show</p>
                </Link>
                <Link
                  href="/watchlist"
                  className={`border rounded-md p-3 ${pathname === "/watchlist" ? "text-foreground font-semibold" : ""}`}
                >
                  <Bookmark />
                  <p className="text-sm font-medium mt-1.5">Watchlist</p>
                </Link>
                <Link
                  href="/history"
                  className={`border rounded-md p-3 ${pathname === "/history" ? "text-foreground font-semibold" : ""}`}
                >
                  <GalleryVerticalEnd />
                  <p className="text-sm font-medium mt-1.5">History</p>
                </Link>
              </div>
            </PopoverContent>
          </Popover>{" "}
          <button>
            <Link
              className={`hidden items-center gap-1.5 xl:flex`}
              href="https://zxcstream.xyz"
              target="_blank"
            >
              <Chromium className="size-5" />
              <span className=" font-medium">API</span>
            </Link>
          </button>
          <button
            className={`xl:block hidden ${pathname === "/settings" ? "text-foreground font-semibold" : ""}`}
          >
            <Link href="/settings" className="flex items-center gap-1.5">
              <Settings className="size-5" />
              <span className=" font-medium">Settings</span>
            </Link>
          </button>
        </span>

        <span className="flex items-center gap-2">
          <SearchModal />
          <InstallButton />
        </span>
      </nav>
    </header>
  );
}
