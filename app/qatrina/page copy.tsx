"use client";

import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

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
    const startDate = new Date("2023-01-14"); // Change to your date!
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
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      emoji: "☕",
    },
    {
      title: "Beach Adventure",
      date: "March 20, 2023",
      description:
        "Sunset walks, sandcastles, and endless laughter by the ocean.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      emoji: "🏖️",
    },
    {
      title: "Road Trip",
      date: "June 15, 2023",
      description:
        "Getting lost together and finding the best memories along the way.",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
      emoji: "🚗",
    },
    {
      title: "Cozy Movie Nights",
      date: "Every Weekend",
      description: "Wrapped in blankets, sharing popcorn, and stealing kisses.",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
      emoji: "🎬",
    },
    {
      title: "Dancing in the Rain",
      date: "September 8, 2023",
      description:
        "When the storm caught us, we just danced through it together.",
      image:
        "https://images.unsplash.com/photo-1515549832467-8783363e19b6?w=800&q=80",
      emoji: "💃",
    },
    {
      title: "Stargazing Night",
      date: "November 2, 2023",
      description: "Counting stars and making wishes, all of them about us.",
      image:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
      emoji: "⭐",
    },
  ];

  const reasons = [
    "Your smile lights up my entire world 🌟",
    "The way you laugh at my terrible jokes 😄",
    "How you always know exactly what I need 💝",
    "Your kindness to everyone around you 🤗",
    "The way you hold my hand 🤝",
    "Your infectious enthusiasm for life 🎊",
    "How you make ordinary moments extraordinary ✨",
    "Your beautiful mind and heart 🧠💖",
    "The way you believe in me 💪",
    "Your adorable quirks and habits 🥰",
    "How safe I feel in your arms 🤗",
    "Your passion for the things you love 🔥",
    "The way you listen to me 👂",
    "Your courage and strength 💪",
    "How you make me want to be better 🌱",
    "Your incredible hugs 🫂",
    "The sparkle in your eyes 👀✨",
    "How you support my dreams 🌟",
    "Your sense of humor 😂",
    "The way you make me feel loved every single day 💕",
  ];

  const letters = [
    {
      title: "To My Everything",
      date: "Valentine's Day 2024",
      content: `My Dearest Love,

I still remember the first time I saw you. Time seemed to stop, and I knew my life would never be the same. Every day since then has been an adventure, a joy, a blessing.

You've taught me what it means to truly love and be loved. You've shown me that home isn't a place—it's a person. And you're my home.

Thank you for your patience, your kindness, your laughter, and your love. Thank you for choosing me every single day.

I love you more than words could ever express, and I promise to spend the rest of my life showing you just how much.

Forever yours,
Your Love 💕`,
    },
    {
      title: "A Year of Love",
      date: "Anniversary Letter",
      content: `My Beautiful Partner,

365 days. 8,760 hours. 525,600 minutes. Every single one of them has been better because of you.

This past year has been filled with so many incredible moments—from quiet mornings wrapped in each other's arms to wild adventures exploring the world together. Each memory is a treasure I'll keep forever.

You make me laugh when I want to cry. You believe in me when I doubt myself. You love me at my worst and celebrate me at my best.

I can't wait to see what the next year brings us. More laughter, more adventures, more love, more us.

Here's to many more years of making beautiful memories together.

All my love,
Forever yours 💖`,
    },
    {
      title: "Just Because",
      date: "A Random Tuesday",
      content: `Hey Beautiful,

I know it's just a regular day, but I wanted to remind you how incredibly special you are to me.

I love the way you scrunch your nose when you're concentrating. I love how you dance in the kitchen when you're cooking. I love your terrible singing in the car and how you always steal the blankets at night.

I love every little thing about you—the big things and the small things, the perfect moments and the messy ones too.

You make every day feel like Valentine's Day.

Thank you for being you. Thank you for being mine.

I love you,
Always 💗`,
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

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600;700&display=swap");

        body {
          margin: 0;
          padding: 0;
          font-family: "Inter", sans-serif;
        }

        h1,
        h2,
        h3 {
          font-family: "Playfair Display", serif;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .text-gradient {
          background: linear-gradient(to right, #ec4899, #ef4444, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4 animate-fadeIn drop-shadow-[0_2px_1px_rgba(0,0,0,0.5)]">
          <p className="text-2xl md:text-3xl text-white/90 mb-8 ">
            To My Beautiful Girlfriend, <strong>Sharie Faye.</strong>
          </p>
          <div className="uppercase space-y-3 max-w-2xl">
            <div className="flex items-center gap-10">
              <div className="flex-1 h-px bg-foreground" />
              <h1 className="text-5xl">Happy</h1>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <h1 className="text-8xl"> Valentine's </h1>
            <div className="flex items-center gap-10">
              <div className="flex-1 h-px bg-foreground" />
              <h1 className="text-5xl">Day</h1>
              <div className="flex-1 h-px bg-foreground" />
            </div>
          </div>

          <div className="text-8xl animate-pulse-slow mt-3">💕</div>

          <p className="mt-8 text-xl text-white/80 max-w-2xl mx-auto">
            Every moment with you is a treasure. Here's a little something
            special for you.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("love-counter")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-12 bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-50 transition-all hover:scale-105 shadow-xl"
          >
            Explore Our Love Story ↓
          </button>
        </div>

        {/* <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 40 + 20}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 6 + 4}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div> */}
      </section>

      {/* Love Counter */}
      <section id="love-counter" className="relative py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-gradient mb-4">
            Our Love Journey
          </h2>
          <p className="text-gray-600 text-xl mb-12">
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
                className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-transform"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {item.value}
                </div>
                <div className="text-white/90 text-lg font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-2xl text-gray-700 font-light italic">
            And every second with you is absolutely perfect 💖
          </p>
        </div>
      </section>

      {/* Memories */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center text-gradient mb-4">
            Our Beautiful Memories
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16">
            Every moment with you is a memory worth keeping
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memories.map((memory, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 text-4xl bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    {memory.emoji}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {memory.title}
                  </h3>
                  <p className="text-pink-600 font-medium mb-3">
                    {memory.date}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {memory.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-3xl font-light text-gray-700 italic">
              Here's to a million more memories together 💕
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center text-gradient mb-4">
            Our Love Timeline
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16">
            The story of us, one milestone at a time
          </p>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full p-4 shadow-xl">
                  <span className="text-3xl">{milestone.icon}</span>
                </div>
                <div className="flex-grow bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-pink-600 font-semibold mb-2">
                    {milestone.date}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-gradient mb-4">
            Reasons Why I Love You
          </h2>
          <p className="text-gray-600 text-xl mb-12">
            Here are just {reasons.length} of infinite reasons...
          </p>

          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-red-400 to-purple-500"></div>
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
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-red-600 transition-all hover:scale-105 shadow-lg"
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                setCurrentReason((prev) => (prev + 1) % reasons.length)
              }
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
            >
              Next →
            </button>
          </div>

          <p className="mt-12 text-2xl text-gray-700 font-light italic">
            And I discover new reasons to love you every single day 💖
          </p>
        </div>
      </section>

      {/* Love Letters */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center text-gradient mb-4">
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
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 border-2 border-pink-200"
              >
                <div className="text-5xl mb-4">💌</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {letter.title}
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

      {/* Final Message */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-pink-400 via-red-400 to-purple-500">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-8xl mb-6 animate-pulse-slow">💖</div>
          <h2 className="text-5xl font-bold text-white mb-6">
            I Love You More Than Words Can Say
          </h2>
          <p className="text-2xl text-white/90 mb-8 leading-relaxed">
            Thank you for being my partner, my best friend, my everything.
            Here's to our forever. ♾️
          </p>
          <p className="text-3xl font-light text-white italic">
            Happy Valentine's Day, My Love 💕
          </p>
        </div>
      </section>
    </div>
  );
}
