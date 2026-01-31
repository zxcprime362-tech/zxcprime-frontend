export type LayoutDensity = "compact" | "comfortable" | "spacious";

export const GRID_CONFIG: Record<LayoutDensity, string> = {
  compact:
    "lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-3 grid-cols-3 lg:gap-2 gap-2",

  comfortable:
    "lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 lg:gap-4 gap-3",

  spacious:
    "lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 lg:gap-6 gap-4",
};
