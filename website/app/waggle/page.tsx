"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "learn" | "practice" | "challenge";

interface FlowerLocation {
  x: number;
  y: number;
  name: string;
  emoji: string;
}

const flowers: FlowerLocation[] = [
  { x: 20, y: 15, name: "Sunflower Field", emoji: "🌻" },
  { x: 78, y: 20, name: "Lavender Garden", emoji: "💜" },
  { x: 40, y: 75, name: "Wildflower Meadow", emoji: "🌺" },
  { x: 82, y: 70, name: "Apple Orchard", emoji: "🍎" },
  { x: 12, y: 78, name: "Clover Patch", emoji: "☘️" },
  { x: 62, y: 10, name: "Rose Garden", emoji: "🌹" },
];

const hivePosition = { x: 50, y: 45 };

function calculateDance(flower: FlowerLocation) {
  const dx = flower.x - hivePosition.x;
  const dy = -(flower.y - hivePosition.y); // flip Y so up is positive
  const distance = Math.sqrt(dx * dx + dy * dy);
  // Angle from straight up (0° = directly above hive toward sun)
  const angleRad = Math.atan2(dx, dy);
  const angleDeg = angleRad * (180 / Math.PI);
  return { angleDeg, distance, angleRad };
}

// Tutorial steps for the Learn tab
const tutorialSteps = [
  {
    title: "Welcome, Scout Bee! 🐝",
    text: "When a scout bee finds flowers, she flies back to the hive and performs a special dance on the honeycomb to tell her sisters exactly where the flowers are. This is called the **waggle dance**!",
    visual: "intro",
  },
  {
    title: "The Figure-8 Pattern",
    text: "The bee dances in a figure-8 shape. The straight part in the middle is called the **waggle run** — this is where all the information is encoded!",
    visual: "figure8",
  },
  {
    title: "Direction = Angle 📐",
    text: "The angle of the waggle run tells direction. **Straight up** on the honeycomb means \"fly toward the sun.\" If the bee waggles at **45° to the right**, it means \"fly 45° to the right of the sun.\"",
    visual: "angle",
  },
  {
    title: "Distance = Duration ⏱️",
    text: "The **longer** the bee waggles during the straight run, the **farther away** the flowers are. A short waggle = close flowers. A long waggle = far flowers!",
    visual: "duration",
  },
  {
    title: "Quality = Excitement ⚡",
    text: "The more **excited** the dance (faster, more vigorous waggling), the **better** the flower patch is! Other bees watch and decide which dance to follow based on the enthusiasm.",
    visual: "quality",
  },
  {
    title: "You're Ready! 🎉",
    text: "Now you know how to read a waggle dance! Head to **Practice** to try encoding your own dances, or jump to **Challenge** to decode mystery dances!",
    visual: "ready",
  },
];

// Figure-8 dance component
function DanceAnimation({
  angleDeg,
  distance,
  isActive,
  showTrail,
}: {
  angleDeg: number;
  distance: number;
  isActive: boolean;
  showTrail: boolean;
}) {
  const waggleDuration = Math.max(0.4, distance / 25); // longer waggle for farther flowers
  const loopDuration = waggleDuration + 1.2; // total figure-8 loop time

  if (!isActive) {
    return (
      <div className="text-5xl">🐝</div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Direction arrow */}
      <div
        className="absolute w-1 bg-purple-300 origin-bottom rounded-full"
        style={{
          height: "80px",
          bottom: "50%",
          left: "50%",
          marginLeft: "-2px",
          transform: `rotate(${angleDeg}deg)`,
          opacity: 0.4,
        }}
      >
        <div className="absolute -top-2 -left-1.5 text-purple-400 text-xs">▲</div>
      </div>

      {/* Sun reference (straight up) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xl opacity-60">☀️</div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[9px] text-amber-500 font-bold">SUN</div>

      {/* Figure-8 trail */}
      {showTrail && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <g transform={`rotate(${angleDeg}, 100, 100)`}>
            {/* Top loop */}
            <ellipse cx="100" cy="65" rx="18" ry="25" fill="none" stroke="#d8b4fe" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
            {/* Bottom loop */}
            <ellipse cx="100" cy="135" rx="18" ry="25" fill="none" stroke="#d8b4fe" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
            {/* Waggle run */}
            <line x1="100" y1="90" x2="100" y2="110" stroke="#a855f7" strokeWidth="3" strokeDasharray="3 2" />
          </g>
        </svg>
      )}

      {/* Dancing bee */}
      <motion.div
        className="text-4xl z-10"
        animate={{
          // Figure-8 motion rotated by the dance angle
          x: [
            0,
            Math.sin((angleDeg * Math.PI) / 180 + Math.PI / 2) * 15,
            0,
            Math.sin((angleDeg * Math.PI) / 180 - Math.PI / 2) * 15,
            0,
          ],
          y: [
            0,
            -25,
            0,
            25,
            0,
          ],
          rotate: [angleDeg, angleDeg + 10, angleDeg, angleDeg - 10, angleDeg],
        }}
        transition={{
          duration: loopDuration,
          repeat: 2,
          ease: "easeInOut",
        }}
      >
        <motion.span
          className="inline-block"
          animate={{ x: [-2, 2, -2, 2, -2] }}
          transition={{ duration: waggleDuration / 3, repeat: Infinity }}
        >
          🐝
        </motion.span>
      </motion.div>

      {/* Waggle info overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-bold">
        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
          Angle: {Math.round(angleDeg)}°
        </span>
        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
          Distance: {Math.round(distance)} units
        </span>
      </div>
    </div>
  );
}

// Tutorial visual components
function TutorialVisual({ step }: { step: string }) {
  switch (step) {
    case "intro":
      return (
        <div className="flex flex-col items-center gap-3">
          <motion.div
            className="text-7xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐝
          </motion.div>
          <div className="flex gap-2 text-3xl">
            <span>🌻</span><span>🌹</span><span>💜</span><span>🌺</span>
          </div>
          <p className="text-purple-600 font-semibold text-sm">A scout bee finds flowers and returns to share the news!</p>
        </div>
      );
    case "figure8":
      return (
        <div className="relative w-48 h-48 mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <ellipse cx="100" cy="65" rx="25" ry="35" fill="none" stroke="#a855f7" strokeWidth="3" />
            <ellipse cx="100" cy="135" rx="25" ry="35" fill="none" stroke="#a855f7" strokeWidth="3" />
            <line x1="100" y1="95" x2="100" y2="105" stroke="#f59e0b" strokeWidth="5" />
            <text x="140" y="105" fontSize="11" fill="#a855f7" fontWeight="bold">Waggle Run</text>
            <line x1="104" y1="100" x2="135" y2="100" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
          <motion.div
            className="absolute text-2xl"
            style={{ top: "35%", left: "42%" }}
            animate={{
              y: [0, -40, 0, 40, 0],
              x: [0, 15, 0, -15, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🐝
          </motion.div>
        </div>
      );
    case "angle":
      return (
        <div className="relative w-48 h-48 mx-auto bg-amber-100 rounded-xl border-2 border-amber-300">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xl">☀️</div>
          <div className="absolute top-7 left-1/2 -translate-x-1/2 text-[9px] font-bold text-amber-600">Straight up = toward sun</div>
          {/* Vertical reference */}
          <div className="absolute top-12 left-1/2 w-0.5 h-24 bg-gray-300 -translate-x-1/2" />
          {/* Angled waggle */}
          <div className="absolute top-12 left-1/2 w-1 h-24 bg-purple-500 origin-top -translate-x-1/2 rotate-45 rounded-full" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
              45° right = flowers are 45° right of sun
            </span>
          </div>
        </div>
      );
    case "duration":
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-xl p-3 border-2 border-green-300">
                <motion.span
                  className="text-3xl inline-block"
                  animate={{ x: [-2, 2] }}
                  transition={{ duration: 0.15, repeat: 3, repeatType: "reverse" }}
                >
                  🐝
                </motion.span>
              </div>
              <p className="text-xs font-bold text-green-700 mt-1">Short waggle</p>
              <p className="text-xs text-gray-500">= Close flowers</p>
            </div>
            <span className="text-2xl text-gray-300">→</span>
            <div className="text-center">
              <div className="bg-red-100 rounded-xl p-3 border-2 border-red-300">
                <motion.span
                  className="text-3xl inline-block"
                  animate={{ x: [-3, 3] }}
                  transition={{ duration: 0.1, repeat: 12, repeatType: "reverse" }}
                >
                  🐝
                </motion.span>
              </div>
              <p className="text-xs font-bold text-red-700 mt-1">Long waggle</p>
              <p className="text-xs text-gray-500">= Far flowers</p>
            </div>
          </div>
        </div>
      );
    case "quality":
      return (
        <div className="flex items-center gap-6 justify-center">
          <div className="text-center">
            <motion.span
              className="text-4xl inline-block"
              animate={{ rotate: [-5, 5] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              🐝
            </motion.span>
            <p className="text-xs font-bold text-gray-500 mt-1">Meh patch</p>
          </div>
          <span className="text-gray-300 text-2xl">vs</span>
          <div className="text-center">
            <motion.span
              className="text-4xl inline-block"
              animate={{ rotate: [-15, 15], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
            >
              🐝
            </motion.span>
            <p className="text-xs font-bold text-amber-600 mt-1">AMAZING patch! 🔥</p>
          </div>
        </div>
      );
    case "ready":
      return (
        <div className="text-center">
          <div className="text-6xl mb-3">🎓</div>
          <div className="flex gap-1 justify-center text-2xl">
            <span>📐</span><span>⏱️</span><span>⚡</span>
          </div>
          <p className="text-purple-600 font-bold mt-2">Direction + Distance + Quality</p>
          <p className="text-sm text-gray-500">You can now read the secret language of bees!</p>
        </div>
      );
    default:
      return null;
  }
}

export default function WagglePage() {
  const [tab, setTab] = useState<Tab>("learn");
  const [tutorialStep, setTutorialStep] = useState(0);

  // Practice state
  const [selectedFlower, setSelectedFlower] = useState<FlowerLocation | null>(null);
  const [isDancing, setIsDancing] = useState(false);

  // Challenge state
  const [challengeTarget, setChallengeTarget] = useState<FlowerLocation | null>(null);
  const [challengeGuess, setChallengeGuess] = useState<FlowerLocation | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startDance = useCallback(() => {
    setIsDancing(true);
    setTimeout(() => setIsDancing(false), 5000);
  }, []);

  const startChallengeRound = useCallback(() => {
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
    setChallengeTarget(randomFlower);
    setChallengeGuess(null);
    setShowResult(false);
    setIsDancing(true);
    setTimeout(() => setIsDancing(false), 5000);
  }, []);

  const handleChallengeGuess = (flower: FlowerLocation) => {
    if (showResult) return;
    setChallengeGuess(flower);
    setShowResult(true);
    setRound(round + 1);
    if (challengeTarget && flower.name === challengeTarget.name) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  // Auto-start challenge when switching to that tab
  useEffect(() => {
    if (tab === "challenge" && !challengeTarget) {
      startChallengeRound();
    }
  }, [tab, challengeTarget, startChallengeRound]);

  const dance = selectedFlower ? calculateDance(selectedFlower) : null;
  const challengeDance = challengeTarget ? calculateDance(challengeTarget) : null;
  const showHints = round < 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 py-8 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          💃 Waggle Dance Simulator
        </h1>
        <p className="text-purple-100 text-lg max-w-2xl mx-auto">
          Honeybees have a secret language — learn to speak it like a melittologist!
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex gap-2 justify-center">
          {([
            { id: "learn" as Tab, label: "Learn", emoji: "📖", desc: "How it works" },
            { id: "practice" as Tab, label: "Practice", emoji: "🌸", desc: "Try encoding" },
            { id: "challenge" as Tab, label: "Challenge", emoji: "🏆", desc: "Decode dances" },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 rounded-xl font-bold transition-all text-center ${
                tab === t.id
                  ? "bg-purple-500 text-white shadow-lg scale-105"
                  : "bg-white text-purple-600 hover:bg-purple-50 border-2 border-purple-100"
              }`}
            >
              <span className="text-xl block">{t.emoji}</span>
              <span className="text-sm">{t.label}</span>
              <span className="block text-[10px] opacity-70">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* ═══════ LEARN TAB ═══════ */}
          {tab === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 overflow-hidden">
                {/* Progress dots */}
                <div className="flex justify-center gap-2 pt-4">
                  {tutorialSteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTutorialStep(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === tutorialStep ? "bg-purple-500 scale-125" : i < tutorialStep ? "bg-purple-300" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Tutorial Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tutorialStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-8"
                  >
                    <h2 className="font-display text-2xl font-bold text-purple-900 text-center mb-2">
                      {tutorialSteps[tutorialStep].title}
                    </h2>
                    <p className="text-gray-700 text-center max-w-lg mx-auto mb-6 leading-relaxed">
                      {tutorialSteps[tutorialStep].text.split("**").map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="text-purple-700">{part}</strong> : part
                      )}
                    </p>

                    {/* Visual */}
                    <div className="bg-purple-50 rounded-xl p-6 flex items-center justify-center min-h-[200px] border-2 border-purple-100">
                      <TutorialVisual step={tutorialSteps[tutorialStep].visual} />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
                  <button
                    onClick={() => setTutorialStep(Math.max(0, tutorialStep - 1))}
                    disabled={tutorialStep === 0}
                    className="px-4 py-2 rounded-lg font-semibold text-purple-600 hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Back
                  </button>
                  <span className="text-sm text-gray-400">
                    {tutorialStep + 1} / {tutorialSteps.length}
                  </span>
                  {tutorialStep < tutorialSteps.length - 1 ? (
                    <button
                      onClick={() => setTutorialStep(tutorialStep + 1)}
                      className="px-4 py-2 rounded-lg font-bold bg-purple-500 text-white hover:bg-purple-600"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={() => setTab("practice")}
                      className="px-4 py-2 rounded-lg font-bold bg-green-500 text-white hover:bg-green-600"
                    >
                      Start Practicing! 🐝
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════ PRACTICE TAB ═══════ */}
          {tab === "practice" && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <p className="text-center text-purple-600 font-semibold mb-6">
                Click a flower on the map to see how a bee would dance to communicate its location!
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Map */}
                <div className="relative bg-gradient-to-b from-green-200 to-green-300 rounded-2xl aspect-square border-4 border-green-600 shadow-lg overflow-hidden">
                  <div className="absolute top-2 right-2 text-3xl">☀️</div>
                  <div className="absolute top-2 right-12 text-[9px] font-bold text-green-800 bg-green-100 px-1.5 py-0.5 rounded-full">
                    Sun is here
                  </div>

                  {/* Hive */}
                  <div
                    className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center z-10"
                    style={{ left: `${hivePosition.x}%`, top: `${hivePosition.y}%` }}
                  >
                    <div className="text-3xl">🏠</div>
                    <span className="absolute -bottom-5 text-[10px] font-bold text-green-900 bg-white/70 px-1 rounded whitespace-nowrap">
                      THE HIVE
                    </span>
                  </div>

                  {/* Flowers */}
                  {flowers.map((flower) => (
                    <motion.button
                      key={flower.name}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { setSelectedFlower(flower); setIsDancing(false); }}
                      className={`absolute w-12 h-12 -ml-6 -mt-6 flex flex-col items-center justify-center text-xl rounded-full transition-all ${
                        selectedFlower?.name === flower.name
                          ? "ring-4 ring-purple-500 bg-white scale-125 shadow-lg"
                          : "hover:bg-white/50"
                      }`}
                      style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
                    >
                      <span className="text-2xl">{flower.emoji}</span>
                      <span className="text-[8px] font-bold text-green-900 whitespace-nowrap leading-none">
                        {flower.name.split(" ")[0]}
                      </span>
                    </motion.button>
                  ))}

                  {/* Direction Line */}
                  {selectedFlower && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line
                        x1={`${hivePosition.x}%`}
                        y1={`${hivePosition.y}%`}
                        x2={`${selectedFlower.x}%`}
                        y2={`${selectedFlower.y}%`}
                        stroke="rgba(147, 51, 234, 0.4)"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                      />
                    </svg>
                  )}
                </div>

                {/* Dance Panel */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 overflow-hidden">
                  <div className="bg-purple-500 text-white p-3 text-center">
                    <h2 className="font-display font-bold">The Waggle Dance</h2>
                  </div>

                  {/* Dance Arena */}
                  <div className="relative bg-amber-50 h-64 flex items-center justify-center border-b-2 border-amber-200">
                    {selectedFlower && dance ? (
                      <DanceAnimation
                        angleDeg={dance.angleDeg}
                        distance={dance.distance}
                        isActive={isDancing}
                        showTrail={true}
                      />
                    ) : (
                      <div className="text-center text-amber-600 px-4">
                        <div className="text-4xl mb-2">🐝</div>
                        <p className="font-semibold text-sm">Click a flower on the map to see the dance!</p>
                      </div>
                    )}
                  </div>

                  {/* Info & Dance Button */}
                  <div className="p-4">
                    {selectedFlower && dance ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-purple-50 rounded-lg p-2 text-center">
                            <span className="text-[10px] font-bold text-purple-500 uppercase">Direction</span>
                            <p className="text-sm font-bold text-purple-800">
                              {Math.round(dance.angleDeg)}° {dance.angleDeg > 0 ? "right" : dance.angleDeg < 0 ? "left" : "straight up"}
                            </p>
                          </div>
                          <div className="bg-amber-50 rounded-lg p-2 text-center">
                            <span className="text-[10px] font-bold text-amber-500 uppercase">Distance</span>
                            <p className="text-sm font-bold text-amber-800">{Math.round(dance.distance)} bee-units</p>
                          </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-2">
                          <p className="text-xs text-green-800">
                            <strong>Translation:</strong> &ldquo;Fly {Math.round(Math.abs(dance.angleDeg))}° {dance.angleDeg > 0 ? "to the right of" : dance.angleDeg < 0 ? "to the left of" : "straight toward"} the sun for {Math.round(dance.distance)} units to find {selectedFlower.name}!&rdquo;
                          </p>
                        </div>
                        <button
                          onClick={startDance}
                          disabled={isDancing}
                          className="w-full bg-purple-500 text-white font-bold py-3 rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isDancing ? "💃 Dancing..." : "💃 Watch the Dance!"}
                        </button>
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 text-sm py-4">
                        Select a flower to begin
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════ CHALLENGE TAB ═══════ */}
          {tab === "challenge" && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Score Bar */}
              <div className="flex justify-between items-center mb-6 bg-white rounded-xl p-3 shadow-md border border-purple-100">
                <div className="flex gap-4">
                  <span className="font-display font-bold text-purple-900">
                    Score: {score}/{round}
                  </span>
                  {streak >= 2 && (
                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-sm font-bold">
                      🔥 {streak} streak!
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-400">
                  Round {round + 1} {showHints ? "(hints on)" : "(no hints!)"}
                </span>
              </div>

              <p className="text-center text-purple-600 font-semibold mb-4">
                {showResult
                  ? ""
                  : isDancing
                  ? "Watch the dance carefully... then click where you think the flowers are!"
                  : "Click a flower on the map to make your guess!"}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Map */}
                <div className="relative bg-gradient-to-b from-green-200 to-green-300 rounded-2xl aspect-square border-4 border-green-600 shadow-lg overflow-hidden">
                  <div className="absolute top-2 right-2 text-3xl">☀️</div>

                  {/* Hive */}
                  <div
                    className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center z-10"
                    style={{ left: `${hivePosition.x}%`, top: `${hivePosition.y}%` }}
                  >
                    <div className="text-3xl">🏠</div>
                    <span className="absolute -bottom-5 text-[10px] font-bold text-green-900 bg-white/70 px-1 rounded whitespace-nowrap">
                      THE HIVE
                    </span>
                  </div>

                  {/* Flowers */}
                  {flowers.map((flower) => {
                    const isCorrect = challengeTarget?.name === flower.name;
                    const isGuessed = challengeGuess?.name === flower.name;

                    return (
                      <motion.button
                        key={flower.name}
                        whileHover={!showResult ? { scale: 1.3 } : {}}
                        whileTap={!showResult ? { scale: 0.9 } : {}}
                        onClick={() => !showResult && !isDancing && handleChallengeGuess(flower)}
                        disabled={showResult || isDancing}
                        className={`absolute w-12 h-12 -ml-6 -mt-6 flex flex-col items-center justify-center rounded-full transition-all ${
                          showResult && isCorrect
                            ? "ring-4 ring-green-500 bg-green-100 scale-125"
                            : showResult && isGuessed && !isCorrect
                            ? "ring-4 ring-red-500 bg-red-100"
                            : isDancing
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-white/50 cursor-pointer"
                        }`}
                        style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
                      >
                        <span className="text-2xl">{flower.emoji}</span>
                        <span className="text-[8px] font-bold text-green-900 whitespace-nowrap leading-none">
                          {flower.name.split(" ")[0]}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Dance Panel */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 overflow-hidden">
                  <div className="bg-purple-500 text-white p-3 text-center">
                    <h2 className="font-display font-bold">Decode This Dance!</h2>
                  </div>

                  {/* Dance Arena */}
                  <div className="relative bg-amber-50 h-64 flex items-center justify-center border-b-2 border-amber-200">
                    {challengeTarget && challengeDance ? (
                      <DanceAnimation
                        angleDeg={challengeDance.angleDeg}
                        distance={challengeDance.distance}
                        isActive={isDancing || showResult}
                        showTrail={showHints || showResult}
                      />
                    ) : (
                      <div className="text-center text-amber-600">
                        <div className="text-4xl mb-2">🐝</div>
                        <p className="font-semibold">Loading...</p>
                      </div>
                    )}
                  </div>

                  {/* Result or Hint */}
                  <div className="p-4">
                    {showResult ? (
                      <div className={`rounded-xl p-4 text-center ${
                        challengeGuess?.name === challengeTarget?.name
                          ? "bg-green-100 border-2 border-green-400"
                          : "bg-red-100 border-2 border-red-400"
                      }`}>
                        <p className="font-bold text-lg">
                          {challengeGuess?.name === challengeTarget?.name
                            ? "Correct! 🎉"
                            : `Not quite! It was ${challengeTarget?.name} ${challengeTarget?.emoji}`}
                        </p>
                        {challengeTarget && (
                          <p className="text-xs text-gray-600 mt-1">
                            The dance was {Math.round(Math.abs(calculateDance(challengeTarget).angleDeg))}° {calculateDance(challengeTarget).angleDeg > 0 ? "right" : "left"}, {Math.round(calculateDance(challengeTarget).distance)} units away
                          </p>
                        )}
                        <button
                          onClick={startChallengeRound}
                          className="mt-3 bg-purple-500 text-white font-bold px-6 py-2 rounded-full hover:bg-purple-600"
                        >
                          Next Round →
                        </button>
                      </div>
                    ) : showHints && challengeDance ? (
                      <div className="bg-purple-50 rounded-xl p-3 text-center">
                        <p className="text-xs font-bold text-purple-500 uppercase mb-1">Hint</p>
                        <p className="text-sm text-purple-800">
                          The bee is dancing at {Math.round(Math.abs(challengeDance.angleDeg))}° to the {challengeDance.angleDeg > 0 ? "right" : "left"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 text-sm py-3">
                        {isDancing ? "Watch the dance..." : "Click a flower on the map!"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
