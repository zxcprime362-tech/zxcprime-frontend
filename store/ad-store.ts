// store/useAdLinkStore.ts
import { create } from "zustand";
import { useAdToggle } from "./useAdToggle";

const COOLDOWN = 40_000;
const AD_LINK = "https://ahere.com";

export const useAdLinkStore = create<{
  openAd: () => boolean;
}>(() => ({
  openAd: () => {
    const { adToggle } = useAdToggle.getState();
    if (adToggle === "off") return false;

    const now = Date.now();
    const last = Number(sessionStorage.getItem("lastAdTime") ?? 0);

    if (now - last < COOLDOWN) return false;

    window.open(AD_LINK, "_blank");
    sessionStorage.setItem("lastAdTime", now.toString());

    return true;
  },
}));
