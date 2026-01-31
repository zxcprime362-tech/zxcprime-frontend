import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hook/use-mobile";
import { motion } from "framer-motion";
export default function SkeletonLanding({
  isSearching,
}: {
  isSearching: boolean;
}) {
  const isMobile = useIsMobile();
  return (
    <div
      className={`relative overflow-hidden bg-background transition-[max-height] duration-300 ease-out lg:h-screen h-[70vh]
    ${isSearching ? "max-h-0" : "lg:max-h-screen max-h-[70vh]"}`}
    >
      <div className="absolute lg:w-[85%] w-[95%]  lg:bottom-25 bottom-5 bg-amber-80 -translate-x-1/2 left-1/2 ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:max-w-[38%]  w-2xl lg:space-y-6 space-y-2  flex flex-col"
        >
          {/* Genre Badge */}
          <div className="inline-block">
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-12 w-4/5 rounded-lg" />
          </div>

          {/* Rating + Date */}
          <div className="flex items-center gap-6">
            <Skeleton className="h-10 w-20 rounded-lg" />
            <div className="h-8 w-px bg-white/10" />
            <Skeleton className="h-6 w-16 rounded-lg" />
          </div>

          {/* Description */}
          <div className="lg:space-y-2 space-y-1">
            <Skeleton className="lg:h-5 h-3 w-full rounded-lg" />
            <Skeleton className="lg:h-5 h-3 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-3/4 rounded-lg lg:block hidden" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
