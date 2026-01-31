"use client";
import { ThemeModeToggle } from "@/components/ui/theme";
import { Tabs } from "@/components/ui/vercel";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLayoutDensity } from "@/store/useLayoutDensity";
import { useCardStyle } from "@/store/useCardStyle";
import { useRoundedCorners } from "@/store/useRoundedCorners";
import { useAccentColor } from "@/store/useAccentColor";
import { useAutoplayNextEpisode } from "@/store/useAutoplayNextEpisode";
import { useLowDataMode } from "@/store/useLowDataMode";
import { Button } from "@/components/ui/button";
import { IconRefresh, IconTrashFilled } from "@tabler/icons-react";
import { useSaveHistory } from "@/store/useSaveHistory";
import { useAnimation } from "@/store/useAnimation";
import StyledToast from "@/components/ui/toasted";
import { useLandingTrailer } from "@/store/useLandingTrailer";
import { useAdToggle } from "@/store/useAdToggle";
export default function SettingsPrime() {
  const [tab, setTab] = useState("appearance");
  const { density, setDensity } = useLayoutDensity();
  const { rounded, setRounded } = useRoundedCorners();
  const { autoplay, setAutoplay } = useAutoplayNextEpisode();
  const { saveHistory, setSaveHistory } = useSaveHistory();
  const { lowDataMode, setLowDataMode } = useLowDataMode();
  const { animation, setAnimation } = useAnimation();
  const { accent, setAccent } = useAccentColor();
  const { style, setStyle } = useCardStyle();
  const { landingTrailer, setLandingTrailer } = useLandingTrailer();
  const { adToggle, setAdToggle } = useAdToggle();
  const tabs = [
    { id: "appearance", label: "Appearance" },
    { id: "player", label: "Playback/Player Settings" },
    { id: "performance", label: "Performance & Data" },
    { id: "privacy", label: "Privacy & Control" },
    { id: "cache", label: "Cache Settings" },
  ];

  const resetSettings = () => {
    setDensity("comfortable");
    setRounded("medium");
    setAutoplay("on");
    setSaveHistory("on");
    setLowDataMode("low");
    setAnimation("on");
    setAccent("red");
    setStyle("title-year");

    StyledToast({
      title: "Successful",
      status: "success",
      description: "Reset settings successful",
    });
  };
  return (
    <div className="lg:w-[85%] lg:py-25 py-15  w-[95%]   mx-auto space-y-8">
      <div className="space-y-3">
        <h1 className=" uppercase  mask-[linear-gradient(to_bottom,black_0%,transparent_85%)] lg:text-6xl text-4xl font-bold text-red-700  translate-y-3 lg:tracking-tight ">
          Settings
        </h1>
        <div className="overflow-x-auto overflow-hidden pb-1.75">
          <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
        </div>
      </div>

      {tab === "appearance" && (
        <div className=" divide-y">
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm hidden lg:block">Theme</h1>
            <ThemeModeToggle />
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm"> Accent Color</h1>
            <Select value={accent} onValueChange={setAccent}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="Red" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="red">
                  Red <span className="text-muted-foreground">(default)</span>
                </SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Autoplay Trailer (Landing)</h1>

            <Select value={landingTrailer} onValueChange={setLandingTrailer}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="On" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="on">
                  On <span className="text-muted-foreground">(default)</span>
                </SelectItem>
                <SelectItem value="off">Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Layout Density</h1>
            <Select value={density} onValueChange={setDensity}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="Comfortable" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>

                <SelectItem value="comfortable">
                  Comfortable{" "}
                  <span className="text-muted-foreground">(default)</span>
                </SelectItem>

                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Card Style</h1>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="Poster (Title & Year)" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="only">Poster Only</SelectItem>
                <SelectItem value="title">Poster (Title)</SelectItem>
                <SelectItem value="title-year">
                  Poster (Title & Year)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Rounded Corners</h1>
            <Select value={rounded} onValueChange={setRounded}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">
                  Medium{" "}
                  <span className="text-muted-foreground">(default)</span>
                </SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {tab === "player" && (
        <div className=" divide-y">
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Autoplay Next Episode</h1>

            <Select value={autoplay} onValueChange={setAutoplay}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="On" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="on">
                  On <span className="text-muted-foreground">(default)</span>
                </SelectItem>
                <SelectItem value="off">Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {tab === "performance" && (
        <div className=" divide-y">
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Low Data Mode</h1>

            <Select value={lowDataMode} onValueChange={setLowDataMode}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="mid" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="mid">
                  Mid <span className="text-muted-foreground">(default)</span>
                </SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Animation</h1>

            <Select value={animation} onValueChange={setAnimation}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="mid" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="on">
                  On <span className="text-muted-foreground">(default)</span>
                </SelectItem>
                <SelectItem value="off">Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Ads</h1>

            <Select value={adToggle} onValueChange={setAdToggle}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="On" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on">
                  On <span className="text-muted-foreground">(default)</span>
                </SelectItem>
                <SelectItem value="off">Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {tab === "privacy" && (
        <div className=" divide-y">
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Save history</h1>
            <Select value={saveHistory} onValueChange={setSaveHistory}>
              <SelectTrigger className="lg:w-50">
                <SelectValue placeholder="On" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="on">
                  On <span className="text-muted-foreground">(default)</span>
                </SelectItem>
                <SelectItem value="off">Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {tab === "cache" && (
        <div className=" divide-y">
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Clear Continue Watching</h1>
            <Button variant="outline">
              Clear <IconTrashFilled />
            </Button>
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Clear Watchlist</h1>
            <Button variant="outline">
              Clear <IconTrashFilled />
            </Button>
          </div>
          <div className="py-6 flex justify-between items-center">
            <h1 className="lg:text-base text-sm">Reset All Settings</h1>
            <Button variant="outline" onClick={resetSettings}>
              Reset <IconRefresh />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
