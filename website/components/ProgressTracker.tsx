"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sessions = [
  { id: 1, title: "Meet the Honeybee", badge: "Bee Spotter" },
  { id: 2, title: "Waggle Dance", badge: "Waggle Dancer" },
  { id: 3, title: "Suiting Up", badge: "Gear Pro" },
  { id: 4, title: "First Inspection", badge: "Frame Reader" },
  { id: 5, title: "The Colony", badge: "Colony Expert" },
  { id: 6, title: "Honeybee Breeds", badge: "Breed Scholar" },
  { id: 7, title: "Hive Products", badge: "Honey Scientist" },
  { id: 8, title: "Hive Health", badge: "Hive Guardian" },
];

interface ProgressTrackerProps {
  completedSessions?: number[];
}

export default function ProgressTracker({ completedSessions = [] }: ProgressTrackerProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-amber-200">
      <h3 className="font-display text-xl font-bold text-amber-800 mb-4">
        Your Beekeeping Journey
      </h3>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {sessions.map((session, i) => {
          const isComplete = completedSessions.includes(session.id);
          const isNext = !isComplete && (i === 0 || completedSessions.includes(sessions[i - 1].id));

          return (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl text-center cursor-pointer transition-colors ${
                  isComplete
                    ? "bg-amber-100 border-2 border-amber-400"
                    : isNext
                    ? "bg-amber-50 border-2 border-dashed border-amber-300 animate-pulse-glow"
                    : "bg-gray-100 border-2 border-gray-200 opacity-50"
                }`}
              >
                <div className="text-2xl">
                  {isComplete ? "⭐" : isNext ? "🐝" : "🔒"}
                </div>
                <span className="text-xs font-semibold leading-tight">
                  {session.title}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
