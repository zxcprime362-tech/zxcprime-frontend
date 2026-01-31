"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  EffectFade,
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { useSearchParams } from "next/navigation";
import SkeletonLanding from "./skeleton";
import LandingContent from "./content";
import { useRef, useState } from "react";
import { CustomListItem } from "@/types/landing-types";
import useMovieById from "@/api/get-movie-by-id";
export default function LandingPage({
  custom_list,
}: {
  custom_list: CustomListItem[];
}) {
  const searchParams = useSearchParams();
  const isSearching = Boolean(searchParams.get("query"));

  const [index, setIndex] = useState(0);
  const currentItem = custom_list[index];
  const swiperRef = useRef<SwiperType | null>(null);
  const id = currentItem.id;
  const media_type = currentItem.media_type;
  const custom_logo = currentItem.custom_logo;
  const custom_image = currentItem.custom_image;

  const { data, isLoading } = useMovieById({ id, media_type });
  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      keyboard={{ enabled: true }}
      pagination={{ type: "progressbar" }}
      modules={[EffectFade, Navigation, Pagination, Keyboard, Autoplay]}
      initialSlide={index}
      onSwiper={(s) => (swiperRef.current = s)}
      onSlideChange={(s) => setIndex(s.realIndex)}
    >
      {custom_list.map((movie, idx) => (
        <SwiperSlide key={movie.id}>
          {({ isActive, isNext, isPrev }) =>
            isLoading || !data ? (
              <SkeletonLanding isSearching={isSearching} />
            ) : (
              <LandingContent
                isSearching={isSearching}
                isActive={isActive}
                isNext={isNext}
                isPrev={isPrev}
                data={data}
                custom_logo={custom_logo}
                custom_image={custom_image}
                media_type={media_type}
              />
            )
          }
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
