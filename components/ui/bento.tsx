import { motion } from "framer-motion";
import {
  Award,
  CalendarDays,
  Clapperboard,
  Flame,
  LayoutPanelTop,
  Lock,
  Telescope,
  TrendingUp,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function FeaturesSection() {
  return (
    <section className="py-25 min-h-screen flex items-center justify-center">
      <div className="lg:max-w-[85%] max-w-[95%] w-full mx-auto">
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=" uppercase  mask-[linear-gradient(to_bottom,black_0%,transparent_85%)] lg:text-6xl text-4xl font-bold text-red-600  lg:tracking-tight translate-y-2"
          >
            MOVIES
          </motion.h1>
          <Breadcrumb>
            <BreadcrumbList className="p-0.5">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Movie</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[250px]">
          {/* 5. Security - Wide (3x1) */}
          <motion.div
            className="group relative md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-700 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
          >
            {/* Image Container */}
            <div className="w-full h-full relative">
              <img
                src="https://image.tmdb.org/t/p/original/ebyxeBh56QNXxSJgTnmz7fXAlwk.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center brightness-50 group-hover:brightness-80 transition duration-400"
              />
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 to-transparent">
              <h3 className="text-xl text-white flex items-center gap-2 font-medium">
                <Flame className="w-5 h-5" />
                Popular Movies
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Watch the latest hits and blockbusters from top studios
                worldwide.
              </p>
            </div>
          </motion.div>

          {/* 6. Mobile Responsive - Wide (3x1) - Expanded to fill gap */}
          <motion.div
            className="group relative md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-700 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
          >
            {/* Image Container */}
            <div className="w-full h-full relative">
              <img
                src="https://image.tmdb.org/t/p/original/ll1msvrkLWWl3g20bgN7g2ua3JA.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center brightness-50 group-hover:brightness-80 transition duration-400"
              />
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 to-transparent">
              <h3 className="text-xl text-white flex items-center gap-2 font-medium">
                <Telescope className="w-5 h-5" />
                Explore
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Browse and filter movies, shows, and series to find your next
                watch.
              </p>
            </div>
          </motion.div>
          {/* 1. Typography - Tall (2x2) */}
          <motion.div
            className="group relative md:col-span-2 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 1)" }}
          >
            <div className="flex-1">
              <div className="w-full h-full relative">
                <img
                  src="https://image.tmdb.org/t/p/original/6WqqEjiycNvDLjbEClM1zCwIbDD.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-50 group-hover:brightness-80 transition duration-400"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 to-transparent">
              <h3 className="text-2xl text-white flex items-center gap-2 font-medium">
                <TrendingUp className="w-5 h-5" />
                Trending
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                See what everyone is watching and discover what's trending
                today.
              </p>
            </div>
          </motion.div>

          {/* 2. Layouts - Standard (2x1) - Swapped with Global Network */}
          <motion.div
            className="group relative md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl  flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 0.98 }}
          >
            {/* Image Container */}
            <div className="w-full h-full relative">
              <img
                src="https://image.tmdb.org/t/p/original/7nfpkR9XsQ1lBNCXSSHxGV7Dkxe.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center brightness-50 group-hover:brightness-80 transition duration-400"
              />
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 to-transparent">
              <h3 className="text-xl text-white flex items-center gap-2 font-medium">
                <CalendarDays className="w-5 h-5" />
                New Release
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Discover the latest movies and shows freshly released this week.
              </p>
            </div>
          </motion.div>

          {/* 3. Global Network - Tall (2x2) - Swapped with Layouts */}

          <motion.div
            className="group relative md:col-span-2 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 1)" }}
          >
            <div className="flex-1">
              <div className="w-full h-full relative">
                <img
                  src="https://image.tmdb.org/t/p/original/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-50 group-hover:brightness-80 transition duration-400"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 to-transparent">
              <h3 className="text-2xl text-white flex items-center gap-2 font-medium">
                <Award className="w-5 h-5" />
                Top Rated
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                See what everyone is watching and discover what's trending
                today.
              </p>
            </div>
          </motion.div>

          {/* 4. Speed - Standard (2x1) */}
          <motion.div
            className="group relative md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl  flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 0.98 }}
          >
            {/* Image Container */}
            <div className="w-full h-full relative">
              <img
                src="https://image.tmdb.org/t/p/original/zvZBNNDWd5LcsIBpDhJyCB2MDT7.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center brightness-50 group-hover:brightness-80 transition duration-400"
              />
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 to-transparent">
              <h3 className="text-xl text-white flex items-center gap-2 font-medium">
                <Clapperboard className="w-5 h-5" />
                Now Playing
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Watch the latest movies currently playing in theaters and
                online.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
