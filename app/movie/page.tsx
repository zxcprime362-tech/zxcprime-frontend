"use client";
import { AnimatePresence, motion } from "motion/react";
import DiscoverMovie from "./movie";
import { useSearchParams } from "next/navigation";
import SearchResult from "../search-components/search-results";
import LandingPage from "../landing-components/landing-page";
import { useMemo } from "react";
import { shuffleArray } from "@/lib/shuffle";
import ReusableSection from "../reusable-section";

export default function Movies() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const isSearching = Boolean(query);
  const custom_list = useMemo(() => {
    return shuffleArray([
      {
        id: 1087192,
        media_type: "movie",
        custom_image: "/ePBpmoO0OVOFBarWU2bPTAsuifA.jpg",
        custom_logo: "",
      },
      {
        id: 254,
        media_type: "movie",
        custom_image: "/mRM2NB0i3wv4HqxXvwIjEVi4Qqq.jpg",
        custom_logo: "/uMKtUKhoZwXi9GcCgIvesOoGrej.png",
      },
      {
        id: 493922,
        media_type: "movie",
        custom_image: "/3YoLQIF9ZImadhwawnzQ20ElRe9.jpg",
        custom_logo: "",
      },
      {
        id: 520763,
        media_type: "movie",
        custom_image: "",
        custom_logo: "",
      },
      {
        id: 476299,
        media_type: "movie",
        custom_image: "/gTO3tFXRjqUJZYQJwYFRvn2LZ8.jpg",
        custom_logo: "",
      },
      {
        id: 1284120,
        media_type: "movie",
        custom_image: "",
        custom_logo: "/pMcUNyatMfE2to8HbPSyd7BNaIy.png",
      },
      {
        id: 949423,
        media_type: "movie",
        custom_image: "",
        custom_logo: "/7VJfeAlhZ9hr7Jan4ojXjfzB8oP.png",
      },
      {
        id: 945961,
        media_type: "movie",
        custom_image: "/eP4RZSHliWu6lPT5WQyHr5ZZKuC.jpg",
        custom_logo: "/69wA8nqCAemlTQkDTwOmKvdtUPW.png",
      },
      {
        id: 1008042,
        media_type: "movie",
        custom_image: "",
        custom_logo: "/yCZVHGRzgxL0qcyz0MNUxoI8SM0.png",
      },
      {
        id: 913290,
        media_type: "movie",
        custom_image: "/kSeU4uk19t82k6Cao7hc6ktDYhF.jpg",
        custom_logo: "/yTiviQpfrfjYfCxTH7hvpIOtVjy.png",
      },
      {
        id: 22894,
        media_type: "movie",
        custom_image: "/znFzJzYIcc0iS5BI9EewscmLssV.jpg",
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
          <ReusableSection media_type="movie" />
        )}
      </AnimatePresence>
    </>
  );
}
