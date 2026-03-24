"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Observation {
  id: number;
  species: string;
  flower: string;
  behavior: string;
  location: string;
  date: string;
  notes: string;
}

const beeOptions = [
  "Queen spotted", "Eggs seen", "Larvae seen", "Capped brood",
  "Honey stores (full)", "Honey stores (partial)", "Honey stores (low)",
  "Pollen stores", "Queen cells spotted", "Drone cells spotted",
  "Varroa mites spotted", "Hive beetle spotted", "Normal activity",
];

const flowerOptions = [
  "Brood frame", "Honey frame", "Pollen frame", "Empty frame",
  "Foundation only", "Natural comb", "Mixed frame",
];

const behaviorOptions = [
  "Calm bees", "Agitated bees", "Festooning (building wax)", "Bearding at entrance",
  "Heavy forager traffic", "Light forager traffic", "Fanning at entrance",
  "Washboarding", "Bringing in pollen", "Orientation flights",
];

const leaderboard = [
  { name: "Victoria's Hive #1", observations: 47, badge: "🥇" },
  { name: "Apiary Team B", observations: 35, badge: "🥈" },
  { name: "The Frame Readers", observations: 28, badge: "🥉" },
  { name: "Queen Spotters", observations: 22, badge: "👑" },
  { name: "Mite Monitors", observations: 18, badge: "🔬" },
];

const resources = [
  {
    name: "BeeInformed Partnership",
    url: "https://beeinformed.org/",
    description: "Join the Sentinel Apiary Program — your hive data helps track colony health across the nation!",
    emoji: "📊",
  },
  {
    name: "Hive Tracks App",
    url: "https://hivetracks.com/",
    description: "A digital beekeeping journal app to track inspections, treatments, and honey harvests.",
    emoji: "📱",
  },
  {
    name: "Local Bee Association",
    url: "https://www.abfnet.org/",
    description: "Find your state beekeeping association — join meetings, mentor programs, and bee clubs for kids!",
    emoji: "🤝",
  },
  {
    name: "Varroa Monitoring Guide",
    url: "https://honeybeehealthcoalition.org/varroa/",
    description: "Learn how to monitor Varroa mite levels with sugar rolls and alcohol washes — essential beekeeping skills!",
    emoji: "🦠",
  },
];

export default function CitizenSciencePage() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [formData, setFormData] = useState({
    species: "",
    flower: "",
    behavior: "",
    location: "",
    notes: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newObs: Observation = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString(),
    };
    setObservations([newObs, ...observations]);
    setFormData({ species: "", flower: "", behavior: "", location: "", notes: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-8 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          📓 Hive Journal
        </h1>
        <p className="text-teal-100 text-lg max-w-2xl mx-auto">
          Record your observations from every hive visit! Track queen health, brood patterns,
          honey stores, and hive conditions like a real beekeeper.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Hive Visits", value: observations.length, emoji: "📝" },
                { label: "Observations Made", value: new Set(observations.map((o) => o.species)).size, emoji: "🐝" },
                { label: "Frame Types Seen", value: new Set(observations.map((o) => o.flower)).size, emoji: "🖼️" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-md border border-teal-100">
                  <span className="text-2xl">{stat.emoji}</span>
                  <div className="font-display text-2xl font-bold text-teal-800">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Add Observation */}
            <div className="bg-white rounded-2xl shadow-md border border-teal-100 overflow-hidden">
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full p-4 flex items-center justify-between bg-teal-500 text-white font-bold hover:bg-teal-600 transition-colors"
              >
                <span>📝 Log New Observation</span>
                <span className="text-xl">{showForm ? "−" : "+"}</span>
              </button>

              {showForm && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="p-6 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">What did you observe?</label>
                    <select
                      value={formData.species}
                      onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-teal-400 outline-none"
                      required
                    >
                      <option value="">Select observation...</option>
                      {beeOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Frame type inspected</label>
                    <select
                      value={formData.flower}
                      onChange={(e) => setFormData({ ...formData, flower: e.target.value })}
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-teal-400 outline-none"
                      required
                    >
                      <option value="">Select frame type...</option>
                      {flowerOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Bee behavior / condition</label>
                    <select
                      value={formData.behavior}
                      onChange={(e) => setFormData({ ...formData, behavior: e.target.value })}
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-teal-400 outline-none"
                      required
                    >
                      <option value="">Select behavior...</option>
                      {behaviorOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hive / Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Hive #1, Victoria's apiary, backyard..."
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-teal-400 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Extra notes (optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Weather, temperature, number of frames inspected, anything unusual..."
                      className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-teal-400 outline-none h-20 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal-500 text-white font-bold py-3 rounded-xl hover:bg-teal-600 transition-colors"
                  >
                    Log Hive Visit 🐝
                  </button>
                </motion.form>
              )}
            </div>

            {/* Observation Log */}
            <div>
              <h3 className="font-display font-bold text-teal-900 text-lg mb-3">Your Hive Visit Log</h3>
              {observations.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-gray-400 border-2 border-dashed border-gray-200">
                  <p className="text-4xl mb-2">🔍</p>
                  <p className="font-semibold">No hive visits logged yet!</p>
                  <p className="text-sm">After your next hive inspection, log what you observed.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {observations.map((obs) => (
                    <div key={obs.id} className="bg-white rounded-xl p-4 shadow-sm border border-teal-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-teal-800">{obs.species}</span>
                          <span className="text-gray-400 mx-2">→</span>
                          <span className="text-pink-600 font-semibold">{obs.flower}</span>
                        </div>
                        <span className="text-xs text-gray-400">{obs.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Behavior:</strong> {obs.behavior} | <strong>Location:</strong> {obs.location}
                      </p>
                      {obs.notes && <p className="text-sm text-gray-500 mt-1 italic">{obs.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-teal-100">
              <h3 className="font-display font-bold text-teal-900 mb-3">🏆 Group Leaderboard</h3>
              <div className="space-y-2">
                {leaderboard.map((team, i) => (
                  <div key={team.name} className="flex items-center gap-2">
                    <span className="text-lg">{team.badge}</span>
                    <span className="text-sm font-semibold text-gray-800 flex-1">{team.name}</span>
                    <span className="text-sm text-teal-600 font-bold">{team.observations}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Citizen Science Projects */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-teal-100">
              <h3 className="font-display font-bold text-teal-900 mb-3">🌍 Join Real Research</h3>
              <div className="space-y-3">
                {resources.map((res) => (
                  <div key={res.name} className="bg-teal-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{res.emoji}</span>
                      <span className="font-bold text-sm text-teal-800">{res.name}</span>
                    </div>
                    <p className="text-xs text-gray-600">{res.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Tips */}
            <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200">
              <h3 className="font-display font-bold text-amber-900 mb-3">📋 Inspection Tips</h3>
              <ul className="text-sm text-amber-800 space-y-2">
                <li>🕐 Inspect on warm, calm days (above 60°F)</li>
                <li>💨 Use cool white smoke — 2-3 puffs at the entrance</li>
                <li>🧤 Always wear your veil and suit</li>
                <li>📏 Check at least 3-4 frames per box</li>
                <li>👑 Always look for eggs — that means the queen was here recently</li>
                <li>⏱️ Keep inspections under 15 minutes to minimize stress</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
