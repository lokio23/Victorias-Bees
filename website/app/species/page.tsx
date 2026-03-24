"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { allSpecies, rarityColors, type BeeSpecies } from "@/lib/data/species";
import { basePath } from "@/lib/basePath";

type FilterType = "all" | "breed" | "caste" | "product";
type RarityFilter = "all" | "common" | "rare" | "legendary";
type SortBy = "name" | "pollinationPower" | "speed" | "rarity";

const quizQuestions = [
  {
    question: "In the colony, you'd rather...",
    options: [
      { text: "Be in charge and make all the big decisions", trait: "queen" },
      { text: "Go on an adventure outside the hive", trait: "forager" },
      { text: "Take care of babies and help others", trait: "nurse" },
      { text: "Protect the hive from intruders", trait: "guard" },
    ],
  },
  {
    question: "Your best quality is...",
    options: [
      { text: "Leadership — everyone follows me", trait: "queen" },
      { text: "Bravery — I'll go anywhere!", trait: "forager" },
      { text: "Caring — I always help others", trait: "nurse" },
      { text: "Loyalty — I protect my friends", trait: "guard" },
    ],
  },
  {
    question: "If the hive were a school, you'd be...",
    options: [
      { text: "The principal", trait: "queen" },
      { text: "The field trip organizer", trait: "forager" },
      { text: "The school nurse", trait: "nurse" },
      { text: "The hall monitor", trait: "guard" },
    ],
  },
  {
    question: "Pick your favorite hive product:",
    options: [
      { text: "Royal jelly — fit for a queen!", trait: "queen" },
      { text: "Honey — sweet and golden!", trait: "forager" },
      { text: "Beeswax — I love building things!", trait: "nurse" },
      { text: "Propolis — strong and protective!", trait: "guard" },
    ],
  },
];

const quizResults: Record<string, string> = {
  queen: "queen-bee",
  forager: "forager-bee",
  nurse: "nurse-bee",
  guard: "guard-bee",
};

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold w-24 text-right text-gray-600">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-xs font-bold w-6 text-gray-700">{value}</span>
    </div>
  );
}

function SpeciesCard({ species, onClick }: { species: BeeSpecies; onClick: () => void }) {
  const colors = rarityColors[species.rarity];
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left ${colors.bg} ${colors.border} border-2 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow`}
    >
      {/* Rarity Banner */}
      <div className={`${colors.badge} text-white text-xs font-bold px-3 py-1 text-center uppercase tracking-wider`}>
        {species.rarity}
      </div>
      {/* Species Image */}
      <div className="h-32 bg-gradient-to-b from-white/50 to-transparent flex items-center justify-center">
        <Image
          src={`${basePath}/images/species/${species.id}-trading-card.png`}
          alt={species.name}
          width={100}
          height={100}
          className="object-contain drop-shadow-md"
        />
      </div>
      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-gray-900 leading-tight">
          {species.name}
        </h3>
        <p className="text-xs italic text-gray-500 mb-2">{species.scientificName}</p>
        <p className="text-sm text-gray-700 line-clamp-2">{species.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs bg-white/60 px-2 py-1 rounded-full">
            {(species as any).category === "breed" ? "🍯 Breed" : (species as any).category === "caste" ? "👥 Colony Role" : "📦 Product"}
          </span>
          <span className="text-xs bg-white/60 px-2 py-1 rounded-full">
            📏 {species.size}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function SpeciesDetail({ species, onClose }: { species: BeeSpecies; onClose: () => void }) {
  const colors = rarityColors[species.rarity];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl ${colors.border} border-3`}
      >
        {/* Header */}
        <div className={`${colors.badge} text-white p-6 rounded-t-3xl`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              {species.rarity}
            </span>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none">
              &times;
            </button>
          </div>
          <div className="text-center mt-4">
            <Image
              src={`${basePath}/images/species/${species.id}-trading-card.png`}
              alt={species.name}
              width={150}
              height={150}
              className="object-contain drop-shadow-lg mb-3"
            />
            <h2 className="font-display text-3xl font-bold">{species.name}</h2>
            <p className="italic text-white/80">{species.scientificName}</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{species.description}</p>

          {/* Superpower */}
          <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
            <h3 className="font-display font-bold text-amber-800 mb-1">⚡ Superpower</h3>
            <p className="text-amber-700 text-sm">{species.superpower}</p>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-display font-bold text-gray-800 mb-3">📊 Stats</h3>
            <div className="space-y-2">
              <StatBar label="Pollination" value={species.stats.pollinationPower} color="bg-green-500" />
              <StatBar label="Speed" value={species.stats.speed} color="bg-blue-500" />
              <StatBar label="Range" value={species.stats.range} color="bg-purple-500" />
              <StatBar label="Social" value={species.stats.socialLevel} color="bg-amber-500" />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <span className="text-xs font-semibold text-gray-500">Habitat</span>
              <p className="text-sm text-gray-800 mt-1">{species.habitat}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <span className="text-xs font-semibold text-gray-500">Diet</span>
              <p className="text-sm text-gray-800 mt-1">{species.diet}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <span className="text-xs font-semibold text-gray-500">Colony Size</span>
              <p className="text-sm text-gray-800 mt-1">{species.colonySize}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <span className="text-xs font-semibold text-gray-500">Region</span>
              <p className="text-sm text-gray-800 mt-1">{species.region}</p>
            </div>
          </div>

          {/* Fun Fact */}
          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
            <h3 className="font-display font-bold text-purple-800 mb-1">🤯 Fun Fact</h3>
            <p className="text-purple-700 text-sm">{species.funFact}</p>
          </div>

          {/* Cultural Note */}
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <h3 className="font-display font-bold text-green-800 mb-1">🌍 Cultural Connection</h3>
            <p className="text-green-700 text-sm">{species.culturalNote}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SpeciesPage() {
  const [selectedSpecies, setSelectedSpecies] = useState<BeeSpecies | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  const filteredSpecies = useMemo(() => {
    let result = [...allSpecies];
    if (filter !== "all") result = result.filter((s) => (s as any).category === filter);
    if (rarityFilter !== "all") result = result.filter((s) => s.rarity === rarityFilter);

    result.sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "pollinationPower": return b.stats.pollinationPower - a.stats.pollinationPower;
        case "speed": return b.stats.speed - a.stats.speed;
        case "rarity": {
          const order = { legendary: 0, rare: 1, common: 2 };
          return order[a.rarity] - order[b.rarity];
        }
        default: return 0;
      }
    });
    return result;
  }, [filter, rarityFilter, sortBy]);

  const handleQuizAnswer = (trait: string) => {
    const newAnswers = [...quizAnswers, trait];
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Find closest match
      // Count most common trait
      const counts: Record<string, number> = {};
      newAnswers.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
      const topTrait = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      const matchId = quizResults[topTrait] || allSpecies[Math.floor(Math.random() * allSpecies.length)].id;
      const match = allSpecies.find((s) => s.id === matchId) || allSpecies[0];
      setSelectedSpecies(match);
      setShowQuiz(false);
      setQuizStep(0);
      setQuizAnswers([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-8 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          🍯 Honeybee Breeds & Colony Roles
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Meet the honeybee subspecies, colony roles, and hive products that make beekeeping amazing!
        </p>
        <button
          onClick={() => { setShowQuiz(true); setQuizStep(0); setQuizAnswers([]); }}
          className="mt-4 bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
        >
          🧪 Quiz: Which Honeybee Role Are YOU?
        </button>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
            >
              <div className="text-center mb-6">
                <span className="text-4xl">🐝</span>
                <h2 className="font-display text-2xl font-bold text-gray-900 mt-2">
                  Which Honeybee Role Are You?
                </h2>
                <div className="flex gap-1 justify-center mt-3">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-8 rounded-full ${i <= quizStep ? "bg-amber-400" : "bg-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="font-semibold text-gray-800 text-center mb-4">
                {quizQuestions[quizStep].question}
              </p>
              <div className="space-y-2">
                {quizQuestions[quizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(opt.trait)}
                    className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-colors font-medium text-gray-700"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowQuiz(false)}
                className="mt-4 text-sm text-gray-400 hover:text-gray-600 w-full text-center"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white rounded-2xl p-4 shadow-md border border-blue-100">
          <div className="flex gap-2">
            {(["all", "breed", "caste", "product"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  filter === f ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f === "all" ? "All" : f === "breed" ? "🍯 Breeds" : f === "caste" ? "👥 Colony Roles" : "📦 Products"}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["all", "common", "rare", "legendary"] as RarityFilter[]).map((r) => (
              <button
                key={r}
                onClick={() => setRarityFilter(r)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  rarityFilter === r
                    ? r === "all"
                      ? "bg-gray-800 text-white"
                      : `${rarityColors[r as keyof typeof rarityColors].badge} text-white`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {r === "all" ? "All Rarities" : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 border-none cursor-pointer"
          >
            <option value="name">Sort: Name</option>
            <option value="pollinationPower">Sort: Pollination Power</option>
            <option value="speed">Sort: Speed</option>
            <option value="rarity">Sort: Rarity</option>
          </select>
        </div>

        {/* Species Count */}
        <p className="text-sm text-gray-500 mt-4 mb-2">
          Showing {filteredSpecies.length} of {allSpecies.length} species
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSpecies.map((species) => (
            <SpeciesCard
              key={species.id}
              species={species}
              onClick={() => setSelectedSpecies(species)}
            />
          ))}
        </div>
      </div>

      {/* Species Detail Modal */}
      <AnimatePresence>
        {selectedSpecies && (
          <SpeciesDetail species={selectedSpecies} onClose={() => setSelectedSpecies(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
