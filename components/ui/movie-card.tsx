import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useAdLinkStore } from "@/store/ad-store";
import { useCardStyle } from "@/store/useCardStyle";
import { MovieTypes } from "@/types/movie-by-id";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { movieGenres } from "@/constants/filter";
export default function MovieCard({
  movie,
  media_type,
}: {
  movie: MovieTypes;
  media_type: string;
}) {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const style = useCardStyle((s) => s.style);
  const [loaded, setLoaded] = useState(false);
  const openAd = useAdLinkStore((s) => s.openAd);

  const date = movie.release_date ?? movie.first_air_date;
  const isRecent =
    date && Date.now() - new Date(date).getTime() <= 30 * 24 * 60 * 60 * 1000;
  const year = String(
    new Date(movie.release_date || movie.first_air_date).getFullYear(),
  );
  const title = movie.title || movie.name || "";
  const router = useRouter();
  const genre = movieGenres.find((g) => g.id === movie.genre_ids[0]);
  return (
    <div
      key={movie.id}
      className="group hover:-translate-y-2 transition-all duration-300 space-y-1.5 max-w-60 active:scale-95  "
      onClick={openAd}
      onMouseEnter={() => router.prefetch(`/details/movie/${movie.id}`)}
    >
      <Link
        href={{
          pathname: `/details/${media_type}/${movie.id}`,
          query: paramsObject,
        }}
        prefetch={false}
      >
        <div className="relative p-px aspect-2/3 ">
          <div className="absolute inset-0 bg-linear-to-t from-red-600 via-transparent to-transparent rounded-md group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
          <div className="relative overflow-hidden rounded-md h-full w-full">
            <img
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              alt={movie.title}
              className={`relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${loaded ? "opacity-100 " : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/90 opacity-0 group-hover:opacity-100 transition duration-500 z-10"></div>
            {isRecent && (
              <div
                className={`absolute z-10 bottom-0 bg-linear-to-b from-red-700 to-red-900 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 lg:px-6 rounded-t-sm py-0.5 text-sm font-medium
                         `}
              >
                Recently Added
              </div>
            )}

            <span className="absolute top-1 right-1 z-10 p-1.5 bg-background/50 backdrop-blur-md text-sm rounded-md font-medium">
              {year}
            </span>
          </div>
        </div>
      </Link>
      {style !== "only" && (
        <div className="mt-2">
          {/* Title */}
          {(style === "title" || style === "title-year") && (
            <h1 className="lg:text-base text-sm font-normal truncate text-center">
              {movie.title ?? movie.name}
            </h1>
          )}

          {/* Year + rating */}
          {style === "title-year" && genre && (
            <span className="lg:text-sm text-xs text-muted-foreground flex justify-center items-center gap-1">
              {genre.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
//  <Link
//       href={{
//         pathname: `/details/${media_type}/${movie.id}`,
//         query: paramsObject,
//       }}
//       scroll={false}
//       prefetch
//       onClick={openAd}
//     >
//       <div
//         onClick={playHover}
//         className="relative group p-px rounded-sm bg-linear-to-b hover:to-red-800 from-transparent active:scale-98 active:from-red-800 transition duration-150 overflow-hidden"
//       >
//         {isRecent && (
//           <div
//             className={`absolute z-10 bottom-0 bg-linear-to-b from-red-700 to-red-900 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 lg:px-6 rounded-t-sm py-0.5 text-sm font-medium
//                          `}
//           >
//             Recently Added
//           </div>
//         )}
//         <div className="aspect-2/3   rounded-sm  transition cursor-pointer overflow-hidden relative ">
//           {movie.poster_path && (
//             <img
//               src={`${IMAGE_BASE_URL}/w780${movie.poster_path}`}
//               alt={movie.title}
//               className={`w-full h-full object-cover transition-opacity duration-300  ${loaded ? "opacity-100 " : "opacity-0"}`}
//               onLoad={() => setLoaded(true)}
//             />
//           )}

//           <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/50 opacity-0 group-hover:opacity-100 transition duration-150"></div>
//         </div>
//       </div>
//       {style !== "only" && (
//         <div className="mt-2">
//           {/* Title */}
//           {(style === "title" || style === "title-year") && (
//             <h1 className="lg:text-base text-sm font-normal truncate">
//               {movie.title ?? movie.name}
//             </h1>
//           )}

//           {/* Year + rating */}
//           {style === "title-year" && (
//             <p className="lg:text-sm text-xs text-muted-foreground">
//               {year}
//               {movie.vote_average && ` • ${movie.vote_average.toFixed(1)} ★`}
//             </p>
//           )}
//         </div>
//       )}
//     </Link>
