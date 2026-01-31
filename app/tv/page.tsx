"use client";
import { AnimatePresence, motion } from "motion/react";
import DiscoverTv from "./tv";
import { useSearchParams } from "next/navigation";
import SearchResult from "../search-components/search-results";
import LandingPage from "../landing-components/landing-page";
import { shuffleArray } from "@/lib/shuffle";
import { useMemo } from "react";
import ReusableSection from "../reusable-section";

export default function Movies() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const isSearching = Boolean(query);

  const custom_list = useMemo(() => {
    return shuffleArray([
      {
        id: 94605,
        media_type: "tv",
        custom_image: "/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
        custom_logo: "/tg1NueHwd4lCAwAlhUA2I0n2Ci8.png",
      },
      {
        id: 114410,
        media_type: "tv",
        custom_image: "",
        custom_logo: "",
      },
      {
        id: 93405,
        media_type: "tv",
        custom_image: "",
        custom_logo: "",
      },
      {
        id: 1429,
        media_type: "tv",
        custom_image: "/xMPpi0sw1g027ZbzZpHTKweyZw6.jpg",
        custom_logo: "/csy774JSTIoo4KUkrFWtU9SHA8j.png",
      },
      {
        id: 207332,
        media_type: "tv",
        custom_image: "/28ou2RmQmrXy48GPEKRxhbauvPu.jpg",
        custom_logo: "",
      },
      {
        id: 124364,
        media_type: "tv",
        custom_image: "/z2hQ10eEjunBrUsmr0cAofP6CNc.jpg",
        custom_logo: "",
      },
      {
        id: 90669,
        media_type: "tv",
        custom_image: "",
        custom_logo: "",
      },
      {
        id: 106651,
        media_type: "tv",
        custom_image: "",
        custom_logo: "",
      },
      {
        id: 126506,
        media_type: "tv",
        custom_image: "",
        custom_logo: "",
      },
      {
        id: 70523,
        media_type: "tv",
        custom_image: "",
        custom_logo: "",
      },
      {
        id: 92749,
        media_type: "tv",
        custom_image: "",
        custom_logo: "",
      },
    ]);
  }, []);
  return (
    <>
      <LandingPage custom_list={custom_list} />
      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.2,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.1,
                ease: "easeInOut",
              },
            }}
          >
            <SearchResult />
          </motion.div>
        ) : (
          <>
            <ReusableSection media_type="tv" />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
