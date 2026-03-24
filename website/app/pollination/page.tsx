"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PuzzlePair {
  bee: { name: string; emoji: string; hint: string };
  flower: { name: string; emoji: string; hint: string };
  explanation: string;
}

const puzzlePairs: PuzzlePair[] = [
  {
    bee: { name: "Nectar Forager", emoji: "🍯", hint: "I carry nectar in my honey stomach back to the hive" },
    flower: { name: "Almond Blossom", emoji: "🌸", hint: "Every single one of my nuts requires a bee visit!" },
    explanation: "Every single almond requires honeybee pollination! California's almond orchards rent 2 million honeybee colonies each February — the largest managed pollination event on Earth.",
  },
  {
    bee: { name: "Pollen Collector", emoji: "🐝", hint: "I pack pollen into baskets on my back legs" },
    flower: { name: "Apple Blossom", emoji: "🍎", hint: "I need cross-pollination between different trees" },
    explanation: "Apple orchards rent millions of honeybee colonies each spring. Honeybees carry pollen between different apple tree varieties, which is essential for fruit production!",
  },
  {
    bee: { name: "Scout Bee", emoji: "🔍", hint: "I find new flower patches and report back with a dance" },
    flower: { name: "Sunflower", emoji: "🌻", hint: "I'm actually thousands of tiny flowers in one big head!" },
    explanation: "A single sunflower head contains up to 2,000 individual florets — a feast for honeybees! Scouts find sunflower fields and recruit hundreds of foragers with waggle dances.",
  },
  {
    bee: { name: "Water Carrier", emoji: "💧", hint: "I bring water back to cool the hive on hot days" },
    flower: { name: "Clover", emoji: "☘️", hint: "I'm a tiny flower that makes some of the world's most popular honey" },
    explanation: "Clover honey is one of the most popular honeys in the world! Clover fields provide abundant nectar all summer long, keeping the colony's food stores healthy.",
  },
  {
    bee: { name: "Nurse Bee", emoji: "👶", hint: "I feed the babies and make royal jelly" },
    flower: { name: "Blueberry", emoji: "🫐", hint: "My bell-shaped flowers need persistent, loyal pollinators" },
    explanation: "Honeybees are key pollinators for blueberry farms. The bell-shaped flowers require the bee to push inside — honeybees learn the technique and become more efficient with practice!",
  },
  {
    bee: { name: "Wax Builder", emoji: "🏗️", hint: "I build the hexagonal comb where honey is stored" },
    flower: { name: "Watermelon", emoji: "🍉", hint: "Without bees, I'd be tiny and misshapen!" },
    explanation: "Without honeybee pollination, watermelons would be small and lopsided! Each watermelon flower needs 8+ bee visits for proper pollination. Wax builders store the nectar as honey!",
  },
];

type Difficulty = "easy" | "medium" | "hard";

export default function PollinationPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedBee, setSelectedBee] = useState<number | null>(null);
  const [selectedFlower, setSelectedFlower] = useState<number | null>(null);
  const [matchResult, setMatchResult] = useState<"correct" | "wrong" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [shuffledFlowers, setShuffledFlowers] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const pairsForRound = puzzlePairs.slice(0, difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 6);

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    setGameStarted(true);
    setScore(0);
    setMatchedPairs(new Set());
    setSelectedBee(null);
    setSelectedFlower(null);
    setMatchResult(null);
    setShowExplanation(null);
    const pairs = puzzlePairs.slice(0, diff === "easy" ? 3 : diff === "medium" ? 4 : 6);
    const indices = pairs.map((_, i) => i);
    setShuffledFlowers(indices.sort(() => Math.random() - 0.5));
    if (diff === "hard") setTimeLeft(60);
    else setTimeLeft(null);
  }, []);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => (t ? t - 1 : null)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleMatch = () => {
    if (selectedBee === null || selectedFlower === null) return;
    const flowerIndex = shuffledFlowers[selectedFlower];

    if (selectedBee === flowerIndex) {
      setMatchResult("correct");
      setScore(score + 1);
      setShowExplanation(pairsForRound[selectedBee].explanation);
      setMatchedPairs(new Set([...matchedPairs, selectedBee]));
    } else {
      setMatchResult("wrong");
      setShowExplanation(null);
    }

    setTimeout(() => {
      setSelectedBee(null);
      setSelectedFlower(null);
      setMatchResult(null);
      if (selectedBee === flowerIndex) {
        setShowExplanation(null);
      }
    }, 8000);
  };

  useEffect(() => {
    if (selectedBee !== null && selectedFlower !== null) {
      handleMatch();
    }
  }, [selectedBee, selectedFlower]);

  const isComplete = matchedPairs.size === pairsForRound.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 py-8 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          🌸 Pollination Puzzle
        </h1>
        <p className="text-pink-100 text-lg max-w-2xl mx-auto">
          Match each honeybee role to the crop it helps pollinate! Discover why farmers need honeybee colonies.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!gameStarted ? (
          /* Difficulty Selection */
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-pink-900 mb-6">Choose Difficulty</h2>
            <div className="flex justify-center gap-4">
              {([
                { diff: "easy" as Difficulty, label: "Easy", desc: "3 pairs, no timer", emoji: "🌱" },
                { diff: "medium" as Difficulty, label: "Medium", desc: "4 pairs, no timer", emoji: "🌿" },
                { diff: "hard" as Difficulty, label: "Hard", desc: "6 pairs + 60s timer!", emoji: "🔥" },
              ]).map(({ diff, label, desc, emoji }) => (
                <button
                  key={diff}
                  onClick={() => startGame(diff)}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border-2 border-pink-200 hover:border-pink-400 transition-all hover:-translate-y-1"
                >
                  <span className="text-4xl block mb-2">{emoji}</span>
                  <span className="font-display font-bold text-lg text-pink-900 block">{label}</span>
                  <span className="text-sm text-gray-500">{desc}</span>
                </button>
              ))}
            </div>
          </div>
        ) : isComplete ? (
          /* Win Screen */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-green-300"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-display text-3xl font-bold text-green-900 mb-2">
              All Matched!
            </h2>
            <p className="text-green-700 text-lg mb-2">
              You matched all {pairsForRound.length} bee-flower pairs!
            </p>
            <p className="text-gray-500 mb-6">
              Score: {score}/{pairsForRound.length}
              {timeLeft !== null && ` | Time remaining: ${timeLeft}s`}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => startGame(difficulty)}
                className="bg-pink-500 text-white font-bold px-6 py-3 rounded-full hover:bg-pink-600"
              >
                Play Again
              </button>
              <button
                onClick={() => setGameStarted(false)}
                className="bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full hover:bg-gray-300"
              >
                Change Difficulty
              </button>
            </div>
          </motion.div>
        ) : (
          /* Game Board */
          <div>
            {/* Score & Timer */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-display font-bold text-pink-900">
                Score: {score}/{pairsForRound.length}
              </span>
              {timeLeft !== null && (
                <span className={`font-display font-bold text-lg ${timeLeft <= 10 ? "text-red-600 animate-pulse" : "text-gray-600"}`}>
                  ⏱️ {timeLeft}s
                </span>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Bees Column */}
              <div>
                <h3 className="font-display font-bold text-amber-800 mb-3 text-center">🐝 Honeybee Roles</h3>
                <div className="space-y-3">
                  {pairsForRound.map((pair, i) => (
                    <button
                      key={`bee-${i}`}
                      onClick={() => !matchedPairs.has(i) && setSelectedBee(i)}
                      disabled={matchedPairs.has(i)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        matchedPairs.has(i)
                          ? "bg-green-100 border-green-300 opacity-60"
                          : selectedBee === i
                          ? "bg-amber-100 border-amber-500 ring-2 ring-amber-300 scale-105"
                          : "bg-white border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                      }`}
                    >
                      <span className="text-2xl mr-2">{pair.bee.emoji}</span>
                      <span className="font-bold text-gray-800">{pair.bee.name}</span>
                      {difficulty !== "easy" && (
                        <p className="text-sm text-gray-500 mt-1 ml-9">{pair.bee.hint}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flowers Column */}
              <div>
                <h3 className="font-display font-bold text-pink-800 mb-3 text-center">🌸 Crops</h3>
                <div className="space-y-3">
                  {shuffledFlowers.map((originalIndex, displayIndex) => {
                    const pair = pairsForRound[originalIndex];
                    if (!pair) return null;
                    return (
                      <button
                        key={`flower-${displayIndex}`}
                        onClick={() => !matchedPairs.has(originalIndex) && setSelectedFlower(displayIndex)}
                        disabled={matchedPairs.has(originalIndex)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          matchedPairs.has(originalIndex)
                            ? "bg-green-100 border-green-300 opacity-60"
                            : selectedFlower === displayIndex
                            ? "bg-pink-100 border-pink-500 ring-2 ring-pink-300 scale-105"
                            : "bg-white border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                        }`}
                      >
                        <span className="text-2xl mr-2">{pair.flower.emoji}</span>
                        <span className="font-bold text-gray-800">{pair.flower.name}</span>
                        {difficulty !== "easy" && (
                          <p className="text-sm text-gray-500 mt-1 ml-9">{pair.flower.hint}</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Match Result */}
            <AnimatePresence>
              {matchResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-6 p-4 rounded-xl text-center ${
                    matchResult === "correct"
                      ? "bg-green-100 border-2 border-green-400"
                      : "bg-red-100 border-2 border-red-400"
                  }`}
                >
                  <p className="font-bold text-lg">
                    {matchResult === "correct" ? "✅ Perfect Match!" : "❌ Try Again!"}
                  </p>
                  {showExplanation && (
                    <p className="text-sm text-green-800 mt-2">{showExplanation}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-gray-500 text-sm mt-4">
              Select one bee and one flower to match them!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
