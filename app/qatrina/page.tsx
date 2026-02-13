"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import daeqat from "@/assets/dae-qat.png";
import daeqat1 from "@/assets/daeqat-1.png";
import daeqat2 from "@/assets/daeqat-2.png";
import daeqat3 from "@/assets/daeqat-3.png";
import daeqat4 from "@/assets/daeqat-4.png";
import daeqat5 from "@/assets/daeqat-5.png";
import daeqat6 from "@/assets/daeqat-6.png";
import AudioPlayer from "../music/dash";
import useMusicSource from "@/hook-music/source";
export default function ValentinesWebsite() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentReason, setCurrentReason] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);

  // Update counter
  useEffect(() => {
    const startDate = new Date("2023-08-8"); // Change to your date!
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      setTimeElapsed({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const memories = [
    {
      title: "Our First Date",
      date: "January 14, 2023",
      description:
        "The day I knew you were special. Coffee turned into hours of conversation.",
      image: daeqat1,
      emoji: "☕",
    },
    {
      title: "Beach Adventure",
      date: "March 20, 2023",
      description:
        "Sunset walks, sandcastles, and endless laughter by the ocean.",
      image: daeqat2,
      emoji: "🏖️",
    },
    {
      title: "Road Trip",
      date: "June 15, 2023",
      description:
        "Getting lost together and finding the best memories along the way.",
      image: daeqat3,
      emoji: "🚗",
    },
    {
      title: "Cozy Movie Nights",
      date: "Every Weekend",
      description: "Wrapped in blankets, sharing popcorn, and stealing kisses.",
      image: daeqat4,
      emoji: "🎬",
    },
    {
      title: "Dancing in the Rain",
      date: "September 8, 2023",
      description:
        "When the storm caught us, we just danced through it together.",
      image: daeqat5,
      emoji: "💃",
    },
    {
      title: "Stargazing Night",
      date: "November 2, 2023",
      description: "Counting stars and making wishes, all of them about us.",
      image: daeqat6,
      emoji: "⭐",
    },
  ];

  const playlist = [
    {
      id: 1,
      title: "Those Eyes",
      artist: "New West",
      image: daeqat1,
    },
    {
      id: 2,
      title: "Always",
      artist: "Daniel Caesar",
      image: daeqat2,
    },
    {
      id: 3,
      title: "A Piece of You",
      artist: "Nathaniel Constantin",
      image: daeqat3,
    },
    {
      id: 4,
      title: "P.S. I Love You",
      artist: "Paul Partohap",
      image: daeqat1,
    },
    {
      id: 5,
      title: "Yakap",
      artist: "Figvres",
      image: daeqat2,
    },
    {
      id: 6,
      title: "love.",
      artist: "wave to earth",
      image: daeqat3,
    },
    {
      id: 7,
      title: "seasons",
      artist: "wave to earth",
      image: daeqat1,
    },
    {
      id: 8,
      title: "Apocalypse",
      artist: "Cigarettes After Sex",
      image: daeqat2,
    },
    {
      id: 9,
      title: "Die For You",
      artist: "Joji",
      image: daeqat3,
    },
    {
      id: 10,
      title: "Sanctuary",
      artist: "Joji",
      image: daeqat1,
    },
    {
      id: 11,
      title: "End Of Beginning",
      artist: "Djo",
      image: daeqat2,
    },

    // ---- Sleep Songs ----
    {
      id: 12,
      title: "Je Te Laisserai Des Mots",
      artist: "Patrick Watson",
      image: daeqat3,
    },
    {
      id: 13,
      title: "Vancouver Sleep Clinic",
      artist: "Vancouver Sleep Clinic",
      image: daeqat1,
    },
    {
      id: 14,
      title: "Space Song",
      artist: "Beach House",
      image: daeqat2,
    },
    {
      id: 15,
      title: "Fade Into You",
      artist: "Mazzy Star",
      image: daeqat3,
    },
    {
      id: 16,
      title: "Look On Down From The Bridge",
      artist: "Mazzy Star",
      image: daeqat1,
    },
  ];

  const reasons = [
    "Nabubuo mo lagi ang araw ko sa simpleng presensya mo lang ☀️",
    "Lagi mo ako kinakausap kahit taga oo lang ako 😄",
    "Lagi mo ako sinasamahan sa mga gusto ko, tulad ng games kaya ka nga nag mml ngayon 💝",
    "Maeffort ka sa mga taong mahal mo at mahalaga sayo 🤗",
    "Best mommy ka kay breanna 🤝 ",
    "Strong ka sa kabila ng mga hindi magagandang nangyari sayo 🎊",
    "Sexy mo mag angela laging matigas ang shield ni tigreal dahil sayo ✨",
    "Sobrang lambing mo tipong kaya ako tunawin 🧠💖",
    "Masarap magluto (saksi si breanna soon ako din) 💪",
    "Genuine kang tao 🥰",
    "Pag pinapagalitan ako pag pasaway ako dahil nafefeel kong concern ka 🤗",
    "Hindi moko pinaghihigpitan masyado tulad ng pag nag-aya ang mga kupal🔥",
    "Yung pisngi mo sarap din kagatin mana sayo breanna 🤗",
    "Yung ngiti mo kapag nag-ooncam ka, sarap titigan 💪",
    "Laging nandiyan ka para suportahan ako 🌟",
    "Palaging tapat at totoo sa akin, kahit sa maliliit na bagay 💕",
    "Pag nag-baby talk ka, ang sarap pakinggan at nakaka-smile sa akin 🥰",
    "Ang pagiging vocal mo at kaya mong ipaliwanag ang sarili mo nang malinaw 💬",
    "Iniinform mo ako at tinatanong kung ano ang okay sa’kin, ramdam ko na hindi ako naiiwan 💕",
    "Hindi ko sinasasabi yan dahil mahal kita, sinasabi ko yan base sa mga nakikita ko iloveyousomuch baby! #walangtitibag08💕",
  ];

  const letters = [
    {
      title: "Para sa Aking Isa at Nag-iisang Baby",
      locked: false,
      date: "Araw ng mga Puso 2026",
      content: `Aking Minamahal,

Naalala ko pa ang unang beses kitang nakita. Parang huminto ang oras, at alam kong hindi na magiging pareho ang buhay ko. Simula noon, bawat araw ay isang pakikipagsapalaran, kagalakan, at biyaya.

Tinuruan mo ako kung ano ang tunay na pagmamahal at paano mahalin at mahalin ng taos-puso. Ipinakita mo sa akin na ang tahanan ay hindi lugar—tao ang tahanan. At ikaw ang aking tahanan.

Salamat sa iyong pasensya, kabaitan, tawa, at pagmamahal. Salamat sa pagpili sa akin araw-araw.

Mahal na mahal kita, higit pa sa kayang ipahayag ng mga salita, at pangako kong gugugulin ko ang buong buhay ko para ipakita kung gaano kita kamahal.

Magpakailanman sa’yo,
Ang Iyong Mahal 💕`,
    },
    {
      title: "Birthday Message",
      locked: true,
      date: "June 2026",
      content: `Aking Magandang Baby,

365 araw. 8,760 oras. 525,600 minuto. Lahat ng iyon ay naging mas maganda dahil sa’yo.

Ang nakaraang taon ay puno ng napakagandang sandali—mula sa tahimik na umaga na magkayakap hanggang sa mga wild na adventures na magkasama nating tuklasin ang mundo. Bawat alaala ay kayamanang laging mananatili sa puso ko.

Pinapatawa mo ako kahit gusto ko nang umiyak. Pinaniniwalaan mo ako kahit nagdadalawang-isip ako. Mahal mo ako sa pinakamababa ko at ipinagdiriwang sa pinakamataas ko.

Hindi na ako makapaghintay na makita kung ano ang dadalhin ng susunod na taon. Higit pang tawa, higit pang adventures, higit pang pagmamahal, higit pang “tayo.”

Para sa mas marami pang taon ng paggawa ng magagandang alaala kasama ka.

Buong pagmamahal ko,
Magpakailanman sa’yo 💖`,
    },
    {
      title: "Anniversary Message",
      locked: true,
      date: "October 2026",
      content: `Hey Mahal,

Alam kong ordinaryong araw lang ito, pero gusto ko lang ipaalala sa’yo kung gaano ka kahalaga sa akin.

Mahal ko kung paano mo kinukumpas ang ilong kapag nagko-concentrate. Mahal ko kung paano ka sumasayaw sa kusina habang nagluluto. Mahal ko yung kakulitan mo sa pagkanta sa kotse at kung paano mo lagi kinukuha ang kumot sa gabi.

Mahal ko ang bawat maliit at malaking bagay tungkol sa’yo—ang mga perpektong sandali at kahit ang magulo man.

Pinapasaya mo ang bawat araw, parang Araw ng mga Puso.

Salamat sa pagiging ikaw. Salamat sa pagiging akin.

Mahal na mahal kita,
Palagi 💗`,
    },
  ];

  const milestones = [
    {
      date: "January 2023",
      title: "We Met",
      description: "The universe conspired to bring us together",
      icon: "✨",
    },
    {
      date: "February 2023",
      title: 'First "I Love You"',
      description: "Three words that changed everything",
      icon: "💌",
    },
    {
      date: "May 2023",
      title: "First Trip Together",
      description: "Adventures are better with you by my side",
      icon: "✈️",
    },
    {
      date: "August 2023",
      title: "Met Each Other's Families",
      description: "They love you almost as much as I do",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      date: "December 2023",
      title: "First Holiday Season",
      description: "Making new traditions together",
      icon: "🎄",
    },
    {
      date: "Today",
      title: "Still Falling",
      description: "Every day I fall more in love with you",
      icon: "💖",
    },
  ];
  const { data: source, isLoading } = useMusicSource({ id: null });
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden ">
      {source?.data?.manifest && (
        <AudioPlayer
          manifestBase64={source.data.manifest}
          manifestMimeType={source.data.manifestMimeType}
          title="Those Eyes"
          artist="New West"
          cover="https://resources.tidal.com/images/b8141875/0897/496a/a150/c7d4e480ade6/320x320.jpg"
        />
      )}

      <div className="fixed bottom-0 -translate-x-1/2 translate-y-40 left-1/2 max-w-6xl opacity-10">
        <img src={daeqat.src} alt="" className="object-cover h-full w-full" />
      </div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10  min-h-screen grid place-items-center"
      >
        <div className=" space-y-6 max-w-4xl text-center">
          <p className="text-lg sm:text-xl md:text-2xl text-rose-700">
            To My Beautiful Girlfriend{" "}
            <strong className="text-rose-800">Sharie Faye.</strong>
          </p>

          <div className="uppercase  space-y-3">
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex-1 h-px bg-rose-400" />
              <h1 className="text-3xl text-pink-700">Happy</h1>
              <div className="flex-1 h-px bg-rose-400" />
            </div>

            <h1 className="text-7xl leading-tight text-rose-800 drop-shadow-[0_4px_15px_rgba(190,24,93,0.3)]">
              Valentine's
            </h1>

            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex-1 h-px bg-rose-400" />
              <h1 className="text-3xl text-pink-700">Day</h1>
              <div className="flex-1 h-px bg-rose-400" />
            </div>
          </div>

          <div className="text-[clamp(2.5rem,8vw,5rem)] drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            💕
          </div>

          <p className="text-base sm:text-lg md:text-xl text-rose-600 max-w-xl mx-auto">
            Every moment with you is a treasure. Here's a little something
            special for you.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("love-counter")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 bg-pink-500 hover:bg-pink-600 transition-all  mx-auto px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-full shadow-lg shadow-pink-300/40"
          >
            Explore Our Love Story <ArrowDown size="18" />
          </button>
        </div>
      </motion.div>

      <section id="love-counter" className="relative py-20 px-4 bg-rose-50">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium text-pink-600 mb-3">
            Our Love Journey
          </h2>
          <p className="text-gray-500 text-lg mb-12">
            Time we've been together
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Days", value: timeElapsed.days },
              { label: "Hours", value: timeElapsed.hours },
              { label: "Minutes", value: timeElapsed.minutes },
              { label: "Seconds", value: timeElapsed.seconds },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-pink-100 rounded-2xl p-8 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
              >
                <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-1">
                  {item.value}
                </div>
                <div className="text-pink-700 text-lg font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-lg md:text-xl text-gray-700 font-light italic">
            And every second with you is absolutely perfect 💖
          </p>
        </div>
      </section>
      <section id="love-counter" className="relative py-20 px-4 bg-rose-50">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium text-pink-600 mb-3">
            Our Song Playlist
          </h2>
          <p className="text-gray-500 text-lg mb-12">
            Time we've been together
          </p>

          <div className="grid md:grid-cols-2 gap-6 divide-y">
            {playlist.map((song, index) => (
              <div key={index} className="flex items-end gap-3">
                <div className="size-15 rounded-md overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={song.image.src}
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-medium">{song.title}</h1>
                  <p className="text-sm">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-lg md:text-xl text-gray-700 font-light italic">
            And every second with you is absolutely perfect 💖
          </p>
        </div>
      </section>
      <section className="relative py-20 px-4 bg-purple-50 ">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium text-pink-600 mb-3 text-center">
            Our Beautiful Memories
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Every moment with you is a memory worth keeping
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memories.map((memory, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={memory.image.src}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl  font-light text-gray-700 italic">
              Here's to a million more memories together 💕
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium text-pink-600 mb-3 text-center">
            Reasons Why I Love You
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Here are just {reasons.length} of infinite reasons...
          </p>

          <div className="bg-white rounded-lg shadow-2xl p-12 mb-8 min-h-75 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-pink-400 via-red-400 to-purple-500"></div>
            <div className="text-7xl mb-6 animate-pulse-slow">❤️</div>
            <p className="text-3xl md:text-4xl font-light text-gray-800 leading-relaxed mb-6">
              {reasons[currentReason]}
            </p>
            <p className="text-pink-600 font-semibold text-lg">
              Reason {currentReason + 1} of {reasons.length}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() =>
                setCurrentReason(
                  (prev) => (prev - 1 + reasons.length) % reasons.length,
                )
              }
              className="bg-gradient-to-r from-pink-500 to-red-500  px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-red-600 transition-all hover:scale-105 shadow-lg"
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                setCurrentReason((prev) => (prev + 1) % reasons.length)
              }
              className="bg-gradient-to-r from-purple-500 to-pink-500  px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
            >
              Next →
            </button>
          </div>

          <p className="mt-12 text-lg md:text-xl text-gray-700 font-light italic">
            And I discover new reasons to love you every single day 💖
          </p>
        </div>
      </section>
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium text-pink-600 mb-3 text-center">
            Love Letters
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16">
            Words from my heart to yours
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {letters.map((letter, index) => (
              <div
                key={index}
                onClick={() => setSelectedLetter(index)}
                className={`bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 border-2 border-pink-200   ${letter.locked ? "pointer-events-none hover:cursor-not-allowed" : ""}`}
              >
                <div className="text-5xl mb-4">💌</div>
                <h3 className="text-2xl font-medium text-gray-800 mb-2">
                  {letter.title} {letter.locked ? "(Locked)" : ""}
                </h3>
                <p className="text-pink-600 font-medium mb-4">{letter.date}</p>
                <p className="text-gray-600">Click to read →</p>
              </div>
            ))}
          </div>

          {selectedLetter !== null && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedLetter(null)}
            >
              <div
                className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-2">
                      {letters[selectedLetter].title}
                    </h3>
                    <p className="text-pink-600 font-medium">
                      {letters[selectedLetter].date}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="text-4xl text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {letters[selectedLetter].content}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="relative py-15 px-4 bg-gradient-to-br from-pink-400 via-red-400 to-purple-500">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-8xl mb-6 animate-pulse-slow">💖</div>
          <h2 className="text-3xl font-medium  mb-6">
            I Love You More Than Words Can Say
          </h2>
          <p className="text-xl /90 mb-8 leading-relaxed">
            Thank you for being my partner, my best friend, my everything.
            Here's to our forever. ♾️
          </p>
          <p className="text-xl font-light  italic">
            Happy Valentine's Day, my Baby, Best mommy, Darling 💕
          </p>
        </div>
      </section>
    </div>
  );
}

//  <div className="min-h-screen bg-linear-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden">
//       {/* Background Glow */}
//       <div
//         className="fixed inset-0 z-0"
//         style={{
//           background: `linear-gradient(315deg, #E1BEE7 0%, #F3E5F5 20%, #FCE4EC 40%, #FFF0F5 60%, #F8BBD9 80%, #E1BEE7 100%)`,
//         }}
//       />

//       {/* Floating Hearts */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute text-pink-300 opacity-20 animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               fontSize: `${Math.random() * 20 + 15}px`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${Math.random() * 4 + 4}s`,
//             }}
//           >
//             ❤️
//           </div>
//         ))}
//       </div>

//       <section className="relative min-h-screen flex items-center justify-center px-4 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//           className="relative z-10 text-center space-y-6 max-w-4xl mx-auto"
//         >
//           <p className="text-lg sm:text-xl md:text-2xl text-rose-700">
//             To My Beautiful Girlfriend{" "}
//             <strong className="text-rose-800">Sharie Faye.</strong>
//           </p>

//           <div className="uppercase space-y-4 sm:space-y-6">
//             <div className="flex items-center gap-4 sm:gap-8">
//               <div className="flex-1 h-px bg-rose-400" />
//               <h1 className="text-3xl text-pink-700">Happy</h1>
//               <div className="flex-1 h-px bg-rose-400" />
//             </div>

//             <h1 className="text-6xl leading-tight text-rose-800 drop-shadow-[0_4px_15px_rgba(190,24,93,0.3)]">
//               Valentine's
//             </h1>

//             <div className="flex items-center gap-4 sm:gap-8">
//               <div className="flex-1 h-px bg-rose-400" />
//               <h1 className="text-3xl text-pink-700">Day</h1>
//               <div className="flex-1 h-px bg-rose-400" />
//             </div>
//           </div>

//           <div className="text-[clamp(2.5rem,8vw,5rem)] drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">
//             💕
//           </div>

//           <p className="text-base sm:text-lg md:text-xl text-rose-600 max-w-xl mx-auto">
//             Every moment with you is a treasure. Here's a little something
//             special for you.
//           </p>

//           <button
//             onClick={() =>
//               document
//                 .getElementById("love-counter")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//             className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 bg-pink-500 hover:bg-pink-600 transition-all  mx-auto px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-full shadow-lg shadow-pink-300/40"
//           >
//             Explore Our Love Story <ArrowDown size="18" />
//           </button>
//         </motion.div>
//       </section>
//     </div>
