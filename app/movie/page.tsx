"use client";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import SearchResult from "../search-components/search-results";
import { useMemo } from "react";
import { shuffleArray } from "@/lib/shuffle";

import LandingSelection from "@/components/ui/landing-selection";

export default function Movies() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const isSearching = Boolean(query);
  const custom_list = useMemo(() => {
    return shuffleArray([
      {
        id: "ff37118c9e1aa54545cd39124185e7e8%3Acbe9e3027ceac37a8c42c7027ada6177",
        media_type: "movie",
        custom_image: "",
        custom_logo: "",
      },
      // {
      //   id: 254,
      //   media_type: "movie",
      //   custom_image: "/mRM2NB0i3wv4HqxXvwIjEVi4Qqq.jpg",
      //   custom_logo: "/uMKtUKhoZwXi9GcCgIvesOoGrej.png",
      // },
      // {
      //   id: 493922,
      //   media_type: "movie",
      //   custom_image: "/3YoLQIF9ZImadhwawnzQ20ElRe9.jpg",
      //   custom_logo: "",
      // },
      // {
      //   id: 520763,
      //   media_type: "movie",
      //   custom_image: "",
      //   custom_logo: "",
      // },
      // {
      //   id: 476299,
      //   media_type: "movie",
      //   custom_image: "/gTO3tFXRjqUJZYQJwYFRvn2LZ8.jpg",
      //   custom_logo: "",
      // },
      // {
      //   id: 1284120,
      //   media_type: "movie",
      //   custom_image: "",
      //   custom_logo: "/pMcUNyatMfE2to8HbPSyd7BNaIy.png",
      // },
      // {
      //   id: 949423,
      //   media_type: "movie",
      //   custom_image: "",
      //   custom_logo: "/7VJfeAlhZ9hr7Jan4ojXjfzB8oP.png",
      // },
      // {
      //   id: 945961,
      //   media_type: "movie",
      //   custom_image: "/eP4RZSHliWu6lPT5WQyHr5ZZKuC.jpg",
      //   custom_logo: "/69wA8nqCAemlTQkDTwOmKvdtUPW.png",
      // },
      // {
      //   id: 1008042,
      //   media_type: "movie",
      //   custom_image: "",
      //   custom_logo: "/yCZVHGRzgxL0qcyz0MNUxoI8SM0.png",
      // },
      // {
      //   id: 913290,
      //   media_type: "movie",
      //   custom_image: "/kSeU4uk19t82k6Cao7hc6ktDYhF.jpg",
      //   custom_logo: "/yTiviQpfrfjYfCxTH7hvpIOtVjy.png",
      // },
      // {
      //   id: 22894,
      //   media_type: "movie",
      //   custom_image: "/znFzJzYIcc0iS5BI9EewscmLssV.jpg",
      //   custom_logo: "",
      // },
    ]);
  }, []);
  return (
    <>
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
          <LandingSelection media_type="movie" />
        )}
      </AnimatePresence>
    </>
  );
}
