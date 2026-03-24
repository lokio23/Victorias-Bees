"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type HiveZone = "brood" | "honey" | "entrance" | "dance" | "queen" | "equipment" | "frames" | null;
type Season = "spring" | "summer" | "fall" | "winter";

const zones: Record<string, { title: string; emoji: string; description: string; seasonNotes: Record<Season, string>; position: string }> = {
  brood: {
    title: "Brood Chamber",
    emoji: "🥚",
    description: "This is the nursery! The queen lays up to 2,000 eggs per day here. Nurse bees keep the temperature at exactly 95°F (35°C) — warmer than your body temperature!",
    seasonNotes: {
      spring: "Spring is baby boom season! The queen ramps up egg-laying as flowers start blooming. Nurse bees work overtime feeding thousands of growing larvae.",
      summer: "Peak nursery activity! The brood chamber is packed with eggs, larvae, and pupae at every stage. Some cells are capped — baby bees are transforming inside!",
      fall: "Egg-laying slows down. The colony is preparing for winter, so fewer new bees are being raised. The queen becomes more selective.",
      winter: "Almost no brood. The queen takes a break and the few remaining larvae are clustered in the warmest center of the hive.",
    },
    position: "top-[35%] left-[30%]",
  },
  honey: {
    title: "Honey Stores",
    emoji: "🍯",
    description: "The pantry! Bees store honey and pollen here to feed the colony. It takes 60,000 bees visiting 2 million flowers to make just 1 pound of honey!",
    seasonNotes: {
      spring: "The pantry is running low after winter. Foragers are racing to bring in fresh nectar to rebuild the stores.",
      summer: "Maximum production! Bees are filling every available cell with nectar and capping it with beeswax once it's ripened into honey.",
      fall: "Stores are being sealed up for winter. The colony needs about 60 pounds of honey to survive until spring!",
      winter: "The bees are slowly eating through their reserves. A cold winter can deplete stores dangerously low.",
    },
    position: "top-[20%] right-[25%]",
  },
  entrance: {
    title: "Hive Entrance",
    emoji: "🚪",
    description: "The front door! Guard bees check every bee that enters, sniffing for the colony's unique scent. Intruders get turned away or stung!",
    seasonNotes: {
      spring: "Busy traffic! Foragers are making dozens of trips per day. Guards are on high alert for robber bees from other colonies.",
      summer: "Rush hour all day long! On hot days, bees fan their wings at the entrance to air-condition the hive.",
      fall: "Guards become extra aggressive — they need to protect winter honey stores from desperate robber bees.",
      winter: "Nearly sealed up. Bees reduce the entrance size with propolis (bee glue) to keep cold air out.",
    },
    position: "bottom-[15%] left-[45%]",
  },
  dance: {
    title: "Dance Floor",
    emoji: "💃",
    description: "The communication hub! Scout bees perform waggle dances here to tell foragers exactly where to find the best flowers — direction, distance, AND quality!",
    seasonNotes: {
      spring: "The dance floor is buzzing with scouts reporting new flower patches after winter. It's like opening day at a new restaurant!",
      summer: "Non-stop performances! Multiple scouts dance simultaneously, competing to recruit foragers to their flower patch.",
      fall: "Fewer dances as flowers become scarce. Scouts search harder and report patches farther from the hive.",
      winter: "The dance floor is quiet. No foraging trips means no dances — the bees cluster together for warmth instead.",
    },
    position: "top-[55%] left-[50%]",
  },
  queen: {
    title: "Queen's Court",
    emoji: "👑",
    description: "The queen is the only bee that can lay fertilized eggs. She's surrounded by attendant bees who feed her, groom her, and spread her pheromones throughout the colony.",
    seasonNotes: {
      spring: "The queen is at peak performance, laying thousands of eggs daily. If the colony feels crowded, they might raise a new queen and swarm!",
      summer: "The queen moves steadily through the brood frames, inspecting cells before laying. Her attendants never leave her side.",
      fall: "The queen slows down. Workers may even put her on a 'diet' to slim her down for winter — she needs to be lighter to survive.",
      winter: "The queen sits at the center of the winter cluster, protected by thousands of bees vibrating their muscles to generate heat.",
    },
    position: "top-[45%] left-[38%]",
  },
  equipment: {
    title: "Beekeeper's Toolkit",
    emoji: "🧰",
    description: "Every beekeeper needs these essential tools: a smoker (calms the bees), a hive tool (pries apart frames), protective gear (bee suit, veil, gloves), and a frame grip for lifting frames safely!",
    seasonNotes: {
      spring: "Spring inspections require a well-lit smoker and sharp hive tool. Check for queen health, brood patterns, and remaining winter stores. Suit up — spring bees can be feisty!",
      summer: "Full gear recommended during honey harvests. You'll need an uncapping knife, extractor access, and clean jars. Smoker is essential when pulling honey supers.",
      fall: "Inspection focus: checking honey stores for winter, treating for Varroa mites. You'll need a sugar roll kit and possibly oxalic acid vaporizer for mite treatment.",
      winter: "Minimal gear needed — mostly just a hive tool to check the weight of hives (heavy = good stores). Avoid opening hives when it's below 50°F!",
    },
    position: "top-[15%] left-[15%]",
  },
  frames: {
    title: "Langstroth Frames",
    emoji: "🖼️",
    description: "Each box holds 10 removable frames where bees build comb. Frames let beekeepers inspect the colony without destroying the comb — the genius of the Langstroth hive design!",
    seasonNotes: {
      spring: "Check frames for healthy brood patterns — a solid pattern of capped brood with few empty cells means a healthy queen. Look for eggs (tiny rice grains standing upright in cells).",
      summer: "Honey frames in the supers should be filling up! A frame is ready to harvest when 80%+ of cells are capped with white beeswax. Uncapped = not ripe yet!",
      fall: "Consolidate frames — remove empty ones and push food stores closer together. This helps the winter cluster access food without breaking apart.",
      winter: "Don't pull frames in winter! If you must check, just peek under the inner cover. You should see bees clustered between frames near the top where honey stores are.",
    },
    position: "top-[30%] right-[12%]",
  },
};

const seasonInfo: Record<Season, { label: string; emoji: string; color: string; bg: string }> = {
  spring: { label: "Spring", emoji: "🌸", color: "text-pink-700", bg: "bg-pink-100" },
  summer: { label: "Summer", emoji: "☀️", color: "text-amber-700", bg: "bg-amber-100" },
  fall: { label: "Fall", emoji: "🍂", color: "text-orange-700", bg: "bg-orange-100" },
  winter: { label: "Winter", emoji: "❄️", color: "text-blue-700", bg: "bg-blue-100" },
};

export default function HivePage() {
  const [activeZone, setActiveZone] = useState<HiveZone>(null);
  const [season, setSeason] = useState<Season>("summer");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-cream">
      {/* Header */}
      <div className="bg-amber-500 py-8 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          🏠 Inside a Langstroth Hive
        </h1>
        <p className="text-amber-100 text-lg max-w-2xl mx-auto">
          This is what you&apos;ll see when you open a real hive! Click on any zone to learn about it.
          Toggle the season to see how the colony changes throughout the year.
        </p>
      </div>

      {/* Season Toggle */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex justify-center gap-2 mb-8">
          {(Object.keys(seasonInfo) as Season[]).map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                season === s
                  ? `${seasonInfo[s].bg} ${seasonInfo[s].color} ring-2 ring-offset-2 ring-amber-400 scale-110`
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {seasonInfo[s].emoji} {seasonInfo[s].label}
            </button>
          ))}
        </div>

        {/* Hive Cross-Section */}
        <div className="relative max-w-3xl mx-auto">
          {/* Hive Shape */}
          <div className="relative bg-gradient-to-b from-amber-300 via-amber-200 to-amber-400 rounded-t-[120px] rounded-b-3xl min-h-[500px] border-4 border-amber-600 shadow-2xl overflow-hidden">
            {/* Honeycomb pattern overlay */}
            <div className="absolute inset-0 honeycomb-bg opacity-40" />

            {/* Zone Buttons */}
            {Object.entries(zones).map(([key, zone]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveZone(activeZone === key ? null : (key as HiveZone))}
                className={`absolute ${zone.position} z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all ${
                  activeZone === key
                    ? "bg-white ring-4 ring-amber-500 scale-110"
                    : "bg-white/80 hover:bg-white animate-pulse-glow"
                }`}
                title={zone.title}
              >
                {zone.emoji}
              </motion.button>
            ))}

            {/* Animated Bees */}
            {season !== "winter" && (
              <>
                <motion.span
                  className="absolute text-xl"
                  animate={{
                    x: [0, 100, 200, 150, 0],
                    y: [200, 150, 250, 300, 200],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  🐝
                </motion.span>
                <motion.span
                  className="absolute text-lg"
                  animate={{
                    x: [300, 200, 100, 250, 300],
                    y: [100, 200, 150, 50, 100],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  🐝
                </motion.span>
                <motion.span
                  className="absolute text-xl"
                  animate={{
                    x: [150, 50, 200, 300, 150],
                    y: [300, 250, 100, 200, 300],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  🐝
                </motion.span>
              </>
            )}

            {/* Winter Cluster */}
            {season === "winter" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <div className="text-4xl mb-2">🐝🐝🐝</div>
                <div className="text-3xl mb-2">🐝👑🐝</div>
                <div className="text-4xl">🐝🐝🐝</div>
                <p className="text-amber-800 font-semibold mt-2 text-sm">
                  Winter Cluster — keeping warm together!
                </p>
              </motion.div>
            )}
          </div>

          {/* Stand */}
          <div className="mx-auto w-1/2 h-4 bg-amber-700 rounded-b-lg" />
          <div className="mx-auto w-1/3 h-6 bg-amber-800 rounded-b-lg" />
        </div>

        {/* Info Panel */}
        <AnimatePresence mode="wait">
          {activeZone && zones[activeZone] && (
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6 max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{zones[activeZone].emoji}</span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-amber-900">
                    {zones[activeZone].title}
                  </h2>
                  <span className={`text-sm font-semibold ${seasonInfo[season].color}`}>
                    {seasonInfo[season].emoji} {seasonInfo[season].label} Activity
                  </span>
                </div>
              </div>
              <p className="text-amber-800 mb-4 leading-relaxed">
                {zones[activeZone].description}
              </p>
              <div className={`${seasonInfo[season].bg} rounded-xl p-4`}>
                <h3 className={`font-semibold ${seasonInfo[season].color} mb-1`}>
                  {seasonInfo[season].emoji} What happens in {seasonInfo[season].label.toLowerCase()}:
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {zones[activeZone].seasonNotes[season]}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt when nothing selected */}
        {!activeZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-amber-600 font-semibold"
          >
            <p className="text-lg">
              👆 Click on any glowing circle in the hive to explore that area!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
