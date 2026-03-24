"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { allSpecies, rarityColors, type BeeSpecies } from "@/lib/data/species";
import { basePath } from "@/lib/basePath";

function StatBar({ label, value, maxValue = 10 }: { label: string; value: number; maxValue?: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[8px] font-bold w-14 text-right uppercase tracking-tight text-gray-500">
        {label}
      </span>
      <div className="flex gap-[2px] flex-1">
        {Array.from({ length: maxValue }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-sm ${
              i < value ? "bg-amber-400" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function TradingCard({ species, flipped, onFlip }: { species: BeeSpecies; flipped: boolean; onFlip: () => void }) {
  const colors = rarityColors[species.rarity];
  const rarityStars = species.rarity === "legendary" ? "★★★" : species.rarity === "rare" ? "★★" : "★";

  return (
    <div
      className="perspective-1000 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={onFlip}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-[250px] h-[350px]"
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl border-4 ${colors.border} overflow-hidden shadow-xl`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Rarity Banner */}
          <div className={`${colors.badge} text-white text-center py-1`}>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {species.rarity} {rarityStars}
            </span>
          </div>

          {/* Bee Image Area */}
          <div className={`${colors.bg} h-36 flex items-center justify-center relative`}>
            <Image
              src={`${basePath}/images/species/${species.id}-trading-card.png`}
              alt={species.name}
              width={120}
              height={120}
              className="object-contain drop-shadow-md"
            />
            {/* Pack indicator */}
            <div className="absolute bottom-1 right-2 text-[9px] font-bold text-gray-400">
              Pack {species.pack}
            </div>
          </div>

          {/* Name Bar */}
          <div className="bg-white px-3 py-2 border-b border-gray-200">
            <h3 className="font-display text-sm font-bold text-gray-900 leading-tight">
              {species.name}
            </h3>
            <p className="text-[9px] italic text-gray-400">{species.scientificName}</p>
          </div>

          {/* Superpower */}
          <div className="px-3 py-2 bg-amber-50">
            <div className="text-[9px] font-bold text-amber-600 uppercase">Superpower</div>
            <p className="text-[10px] text-amber-800 leading-tight">{species.superpower}</p>
          </div>

          {/* Quick Facts */}
          <div className="px-3 py-1 flex gap-2 text-[9px]">
            <span className={`${colors.bg} px-1.5 py-0.5 rounded-full font-semibold ${colors.text}`}>
              {species.social ? "Social" : "Solitary"}
            </span>
            <span className="bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-600 font-semibold">
              {species.size}
            </span>
          </div>

          {/* Honey Beez Logo */}
          <div className="absolute bottom-1 left-0 right-0 text-center">
            <span className="text-[8px] font-display font-bold text-gray-300">
              VICTORIA&apos;S BEES
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl border-4 ${colors.border} overflow-hidden shadow-xl bg-white`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Header */}
          <div className={`${colors.badge} text-white text-center py-2`}>
            <h3 className="font-display text-sm font-bold">{species.name}</h3>
          </div>

          {/* Stats */}
          <div className="p-3 space-y-1.5">
            <div className="text-[9px] font-bold text-gray-600 uppercase mb-2">Battle Stats</div>
            <StatBar label="Pollinate" value={species.stats.pollinationPower} />
            <StatBar label="Speed" value={species.stats.speed} />
            <StatBar label="Range" value={species.stats.range} />
            <StatBar label="Social" value={species.stats.socialLevel} />
          </div>

          {/* Info */}
          <div className="px-3 space-y-2">
            <div>
              <div className="text-[9px] font-bold text-gray-500 uppercase">Habitat</div>
              <p className="text-[10px] text-gray-700 leading-tight">{species.habitat}</p>
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-500 uppercase">Colony</div>
              <p className="text-[10px] text-gray-700">{species.colonySize}</p>
            </div>
            <div>
              <div className="text-[9px] font-bold text-purple-500 uppercase">Fun Fact</div>
              <p className="text-[10px] text-gray-700 leading-tight line-clamp-3">{species.funFact}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[8px] text-gray-300 font-display font-bold">
              VICTORIA&apos;S BEES • #{allSpecies.indexOf(species) + 1}/{allSpecies.length}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CardsPage() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [selectedPack, setSelectedPack] = useState<number | null>(null);

  const toggleFlip = (id: string) => {
    const next = new Set(flippedCards);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setFlippedCards(next);
  };

  const displaySpecies = selectedPack
    ? allSpecies.filter((s) => s.pack === selectedPack)
    : allSpecies;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-8 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          🃏 Victoria&apos;s Collector Cards
        </h1>
        <p className="text-amber-100 text-lg max-w-2xl mx-auto">
          Collect all 20 honeybee cards! Breeds, colony roles, and hive products. Click to flip and see stats.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Pack Selection */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedPack(null)}
            className={`px-5 py-2 rounded-full font-bold transition-all ${
              selectedPack === null
                ? "bg-amber-500 text-white shadow-lg"
                : "bg-white text-amber-600 hover:bg-amber-50"
            }`}
          >
            All Cards ({allSpecies.length})
          </button>
          <button
            onClick={() => setSelectedPack(1)}
            className={`px-5 py-2 rounded-full font-bold transition-all ${
              selectedPack === 1
                ? "bg-amber-500 text-white shadow-lg"
                : "bg-white text-amber-600 hover:bg-amber-50"
            }`}
          >
            🍯 Breeds ({allSpecies.filter((s) => s.pack === 1).length})
          </button>
          <button
            onClick={() => setSelectedPack(2)}
            className={`px-5 py-2 rounded-full font-bold transition-all ${
              selectedPack === 2
                ? "bg-amber-500 text-white shadow-lg"
                : "bg-white text-amber-600 hover:bg-amber-50"
            }`}
          >
            👥 Colony ({allSpecies.filter((s) => s.pack === 2).length})
          </button>
          <button
            onClick={() => setSelectedPack(3)}
            className={`px-5 py-2 rounded-full font-bold transition-all ${
              selectedPack === 3
                ? "bg-amber-500 text-white shadow-lg"
                : "bg-white text-amber-600 hover:bg-amber-50"
            }`}
          >
            📦 Products ({allSpecies.filter((s) => s.pack === 3).length})
          </button>
        </div>

        {/* Rarity Legend */}
        <div className="flex justify-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-gray-600 font-semibold">Common ★</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-gray-600 font-semibold">Rare ★★</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500" />
            <span className="text-gray-600 font-semibold">Legendary ★★★</span>
          </div>
        </div>

        {/* Card Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {displaySpecies.map((species) => (
            <TradingCard
              key={species.id}
              species={species}
              flipped={flippedCards.has(species.id)}
              onFlip={() => toggleFlip(species.id)}
            />
          ))}
        </div>

        {/* Print Hint */}
        <div className="mt-12 text-center bg-white rounded-2xl p-6 shadow-md border border-amber-200 max-w-xl mx-auto">
          <h3 className="font-display font-bold text-amber-900 mb-2">🖨️ Want Physical Cards?</h3>
          <p className="text-gray-600 text-sm">
            Ask your camp counselor for the printed trading card packs!
            Pack 1 unlocks at Session 1 and Pack 2 unlocks at Session 5.
          </p>
        </div>
      </div>
    </div>
  );
}
