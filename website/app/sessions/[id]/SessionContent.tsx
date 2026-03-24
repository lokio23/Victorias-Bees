"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getSessionById, sessions } from "@/lib/data/sessions";

export default function SessionContent({ sessionId }: { sessionId: number }) {
  const session = getSessionById(sessionId);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="text-6xl mb-4">🐝</div>
          <h1 className="font-display text-3xl font-bold text-amber-900 mb-2">Session Not Found</h1>
          <Link href="/" className="text-amber-600 hover:text-amber-800 font-semibold underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const prevSession = sessionId > 1 ? sessions.find((s) => s.id === sessionId - 1) : null;
  const nextSession = sessionId < 8 ? sessions.find((s) => s.id === sessionId + 1) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-cream">
      {/* Hero */}
      <div className={`bg-gradient-to-r ${session.color} py-12 px-4 text-center text-white`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sm font-bold uppercase tracking-widest opacity-80">
            Session {session.id} of 8
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3 drop-shadow-sm">
            {session.emoji} {session.title}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{session.subtitle}</p>
          <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold">
            Badge: {session.badge} ⭐
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Hook Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Did You Know?</span>
          <p className="font-display text-xl md:text-2xl font-bold text-amber-900 mt-2">
            {session.hookFact}
          </p>
        </motion.div>

        {/* Key Learning Points */}
        <section>
          <h2 className="font-display text-2xl font-bold text-amber-900 mb-4">
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {session.learningPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-md border border-amber-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{point.emoji}</span>
                  <h3 className="font-display font-bold text-gray-900">{point.title}</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Fun Facts */}
        <section>
          <h2 className="font-display text-2xl font-bold text-amber-900 mb-4">
            🤯 Mind-Blowing Facts
          </h2>
          <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
            <ul className="space-y-3">
              {session.funFacts.map((fact, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-purple-500 font-bold text-lg mt-0.5">
                    {["🐝", "🍯", "🌸", "⭐"][i % 4]}
                  </span>
                  <span className="text-purple-900 text-sm leading-relaxed">{fact}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Activities */}
        <section>
          <h2 className="font-display text-2xl font-bold text-amber-900 mb-4">
            Hands-On Activities
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {session.activities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="bg-green-50 rounded-xl p-5 border-2 border-green-200 hover:border-green-400 transition-colors"
              >
                <span className="text-3xl block mb-2">{activity.emoji}</span>
                <h3 className="font-display font-bold text-green-900 mb-1">{activity.name}</h3>
                <p className="text-green-800 text-sm leading-relaxed">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cultural Connection */}
        <section>
          <h2 className="font-display text-2xl font-bold text-amber-900 mb-4">
            🌍 Cultural Connection
          </h2>
          <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              {session.culturalNote.tradition}
            </span>
            <p className="text-amber-900 mt-2 leading-relaxed">{session.culturalNote.text}</p>
          </div>
        </section>

        {/* Related Module */}
        {session.relatedModule && (
          <section className="text-center">
            <Link
              href={session.relatedModule.href}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              <span className="text-xl">{session.relatedModule.emoji}</span>
              {session.relatedModule.label}
            </Link>
          </section>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t-2 border-amber-100">
          {prevSession ? (
            <Link
              href={`/sessions/${prevSession.id}`}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold"
            >
              <span>←</span>
              <span className="text-sm">Session {prevSession.id}: {prevSession.title}</span>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/"
            className="text-amber-500 hover:text-amber-700 font-semibold text-sm"
          >
            Home
          </Link>
          {nextSession ? (
            <Link
              href={`/sessions/${nextSession.id}`}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold"
            >
              <span className="text-sm">Session {nextSession.id}: {nextSession.title}</span>
              <span>→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
