"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Map story node IDs to adventure scene image filenames
const nodeImages: Record<string, string> = {
  arrive: "apiary-arrival",
  suit_up: "suit-up",
  smoker: "smoker",
  approach_hive_pine: "pine-needles",
  approach_hive_burlap: "burlap",
  open_hive_side: "hive-box",
  open_hive_front: "blocked-entrance",
  inspect_frame_smoke: "inspect-frame",
  inspect_frame_calm: "calm-approach",
  discovery_eggs: "eggs-discovery",
  discovery_queen: "queen-spotted",
  surprise_eggs: "bee-landing",
  surprise_queen: "bee-landing",
  ending_still_eggs: "ending-calm",
  ending_step_eggs: "ending-observer",
  ending_still_queen: "ending-apiarist",
  ending_step_queen: "ending-smoker",
};

interface StoryNode {
  id: string;
  text: string;
  emoji: string;
  choices?: { text: string; nextId: string }[];
  ending?: { title: string; description: string };
}

const roles = [
  {
    id: "first-timer",
    name: "First-Timer",
    emoji: "🧤",
    description:
      "It's your very first trip to a real bee yard. Suit up and get ready to meet thousands of honeybees!",
    color: "from-green-500 to-emerald-600",
  },
];

// Track choices to determine ending
type ChoicePath = {
  smoker?: "pine" | "burlap";
  approach?: "side" | "front";
  hiveAction?: "smoke" | "calm";
  inspect?: "eggs" | "queen";
  surprise?: "still" | "step_back";
};

const apiaryStory: Record<string, StoryNode> = {
  arrive: {
    id: "arrive",
    text: "Your mom pulls the truck down a gravel lane and you see it — rows of white wooden boxes lined up in the grass, each one humming with life. A beekeeper in a wide-brimmed hat waves you over. \"Welcome to the apiary!\" she says with a grin. \"Ready to meet some bees?\" Your heart is pounding, but you nod.",
    emoji: "🏡",
    choices: [
      { text: "\"I was born ready!\"", nextId: "suit_up" },
      { text: "\"A little nervous, but let's do it!\"", nextId: "suit_up" },
    ],
  },
  suit_up: {
    id: "suit_up",
    text: "The beekeeper hands you a white bee suit, a pair of leather gloves, and a mesh veil. \"The suit keeps you safe so the bees stay calm and you stay calm,\" she explains. The suit is a little big on you, but you don't mind — you feel like an astronaut suiting up for a mission. Time to gear up!",
    emoji: "👨‍🚀",
    choices: [
      { text: "Zip up the veil first", nextId: "smoker" },
      { text: "Put on the gloves first", nextId: "smoker" },
    ],
  },
  smoker: {
    id: "smoker",
    text: "\"Every beekeeper needs a smoker,\" says the beekeeper, holding up a metal can with a bellows on the side. \"A little puff of cool smoke tells the bees to stay relaxed. But first we have to light it.\" She opens the lid and shows you a handful of fuel options.",
    emoji: "💨",
    choices: [
      { text: "Use pine needles", nextId: "approach_hive_pine" },
      { text: "Use burlap", nextId: "approach_hive_burlap" },
    ],
  },
  approach_hive_pine: {
    id: "approach_hive_pine",
    text: "You stuff pine needles into the smoker and the beekeeper helps you light them. They crackle and release a sweet, woodsy smoke. \"Pine needles burn cool and steady — great choice,\" she says. Now it's time to walk over to the hive. The entrance is busy with bees zooming in and out like tiny airplanes at an airport.",
    emoji: "🌲",
    choices: [
      { text: "Approach from the side", nextId: "open_hive_side" },
      { text: "Walk in front of the entrance", nextId: "open_hive_front" },
    ],
  },
  approach_hive_burlap: {
    id: "approach_hive_burlap",
    text: "You tear off a strip of burlap and push it into the smoker. The beekeeper lights it and it smolders with thick, white smoke. \"Burlap makes nice dense smoke — good pick,\" she nods approvingly. Now it's time to walk over to the hive. The entrance is busy with bees zooming in and out like tiny airplanes at an airport.",
    emoji: "🧶",
    choices: [
      { text: "Approach from the side", nextId: "open_hive_side" },
      { text: "Walk in front of the entrance", nextId: "open_hive_front" },
    ],
  },
  open_hive_side: {
    id: "open_hive_side",
    text: "You circle around and approach from the side, staying out of the flight path. \"Perfect,\" the beekeeper whispers. \"Never block the front door — that's like standing in the middle of a highway.\" She slides her hive tool under the outer cover and pops it off. A wave of warm, sweet air rises up and you hear the deep hum of thousands of bees.",
    emoji: "📦",
    choices: [
      { text: "Puff some smoke across the top", nextId: "inspect_frame_smoke" },
      { text: "Stay calm and proceed slowly", nextId: "inspect_frame_calm" },
    ],
  },
  open_hive_front: {
    id: "open_hive_front",
    text: "You walk right up to the front of the hive. Immediately, a few guard bees buzz up to check you out, bumping against your veil. \"Whoa — let's scoot to the side,\" the beekeeper says gently, guiding you over. \"The front entrance is their runway. They get defensive if you block it.\" Once you're repositioned, she pops off the outer cover. Warm, honey-scented air washes over you.",
    emoji: "🚧",
    choices: [
      { text: "Puff some smoke to calm things down", nextId: "inspect_frame_smoke" },
      { text: "Stay calm and proceed slowly", nextId: "inspect_frame_calm" },
    ],
  },
  inspect_frame_smoke: {
    id: "inspect_frame_smoke",
    text: "You give the bellows two gentle squeezes. Cool smoke drifts across the tops of the frames and the bees dip down between them. \"See that? The smoke makes them think there might be a fire, so they go eat honey just in case they need energy to leave. It keeps them busy and calm.\" The beekeeper grips a frame and slowly lifts it out. It's covered with bees!",
    emoji: "🔍",
    choices: [
      { text: "Look for eggs", nextId: "discovery_eggs" },
      { text: "Look for the queen", nextId: "discovery_queen" },
    ],
  },
  inspect_frame_calm: {
    id: "inspect_frame_calm",
    text: "You take a deep breath and hold steady. The beekeeper nods with approval. \"Bees can sense your energy. If you're calm, they're calm.\" She grips a frame with both hands and draws it straight up, slow and smooth. It's heavy with honeycomb and covered in crawling bees. The sunlight catches the wax and it glows golden.",
    emoji: "🧘",
    choices: [
      { text: "Look for eggs", nextId: "discovery_eggs" },
      { text: "Look for the queen", nextId: "discovery_queen" },
    ],
  },
  discovery_eggs: {
    id: "discovery_eggs",
    text: "You lean in close and peer into the tiny hexagonal cells. At first you just see shiny liquid — that's fresh nectar. But then you spot them: tiny white grains standing upright at the bottom of some cells, each one no bigger than a grain of rice. \"Those are eggs!\" the beekeeper beams. \"The queen laid those just today. In three days they'll hatch into larvae.\" You can't believe something so small will become a bee.",
    emoji: "🥚",
    choices: [
      { text: "\"That's so cool!\" (Keep looking)", nextId: "surprise_eggs" },
    ],
  },
  discovery_queen: {
    id: "discovery_queen",
    text: "You scan the frame carefully. Workers everywhere — but then you see her. She's longer than the rest, with a smooth, shiny back and a pointed abdomen. A little circle of attendant bees surrounds her, grooming and feeding her. \"You found her!\" the beekeeper gasps. \"Some beekeepers search for minutes and can't spot her. You've got sharp eyes!\" The queen pauses, dips her abdomen into a cell, and lays an egg right before your eyes.",
    emoji: "👑",
    choices: [
      { text: "\"Wow, I can't believe I found her!\" (Keep watching)", nextId: "surprise_queen" },
    ],
  },
  surprise_eggs: {
    id: "surprise_eggs",
    text: "As you're admiring the frame, a single bee lands right on the back of your glove. She walks in a little circle, her antennae tapping the leather. Your eyes go wide behind the veil.",
    emoji: "🐝",
    choices: [
      { text: "Stay perfectly still", nextId: "ending_still_eggs" },
      { text: "Slowly set down the frame and step back", nextId: "ending_step_eggs" },
    ],
  },
  surprise_queen: {
    id: "surprise_queen",
    text: "As you're watching the queen, a single bee lands right on the back of your glove. She walks in a little circle, her antennae tapping the leather. Your eyes go wide behind the veil.",
    emoji: "🐝",
    choices: [
      { text: "Stay perfectly still", nextId: "ending_still_queen" },
      { text: "Slowly set down the frame and step back", nextId: "ending_step_queen" },
    ],
  },
  ending_still_eggs: {
    id: "ending_still_eggs",
    text: "You freeze. The bee taps around for a few seconds, decides your glove isn't a flower, and flies off. The beekeeper grins. \"You didn't even flinch. That's the number one rule — stay calm and the bees stay calm.\"",
    emoji: "🧤",
    ending: {
      title: "Calm Beekeeper! 🧘",
      description:
        "You stayed cool under pressure and earned the beekeeper's respect. Staying still when a bee lands on you is the hallmark of a true beekeeper. You found eggs, kept your nerve, and left the apiary buzzing with excitement. The bees barely noticed you were there — and that's the highest compliment!",
    },
  },
  ending_step_eggs: {
    id: "ending_step_eggs",
    text: "You gently lower the frame back into the hive and take one slow step back. The bee on your glove lifts off and returns to the hive. \"Smart move,\" the beekeeper says. \"You put the bees first. That frame is their home, and you handled it with care.\"",
    emoji: "🌿",
    ending: {
      title: "Sharp-Eyed Observer! 🔬",
      description:
        "You spotted bee eggs that most beginners miss entirely, and you handled the hive with the gentle respect it deserves. Your careful eye and steady hands tell the beekeeper you'll be back — and next time, you might even find the queen. The apiary has a new friend!",
    },
  },
  ending_still_queen: {
    id: "ending_still_queen",
    text: "You hold completely still. The bee cleans her antennae on your glove, then lifts off to rejoin her sisters. The beekeeper laughs. \"You've got ice in your veins AND eagle eyes — you found the queen on your first try!\"",
    emoji: "⭐",
    ending: {
      title: "Future Apiarist! 🌟",
      description:
        "Finding the queen on your very first hive inspection is rare. Staying perfectly still when a bee landed on you is even rarer. You showed the calm confidence of someone who truly connects with bees. The beekeeper says you're welcome back anytime — and she means it. The apiary just found its next beekeeper!",
    },
  },
  ending_step_queen: {
    id: "ending_step_queen",
    text: "You carefully slide the frame back into the hive and take a quiet step back. The bee hops off your glove and disappears into the colony. \"Good instincts,\" the beekeeper says. \"You spotted the queen AND respected the hive's space. Not bad for a first-timer.\"",
    emoji: "💚",
    ending: {
      title: "Natural with the Smoker! 🌿",
      description:
        "You lit the smoker, found the queen, and handled every surprise with grace. The beekeeper noticed how carefully you moved around the hive — never rushing, never panicking. You treated the bees like the amazing creatures they are, and they returned the favor. You're a natural!",
    },
  },
};

export default function AdventurePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentNode, setCurrentNode] = useState<string>("arrive");

  const node = apiaryStory[currentNode];

  const resetAdventure = () => {
    setSelectedRole(null);
    setCurrentNode("arrive");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-8 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          🧤 A Day at the Apiary
        </h1>
        <p className="text-green-100 text-lg max-w-2xl mx-auto">
          Your first visit to a real bee yard. Suit up, light the smoker, and
          peek inside a living hive!
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {!selectedRole ? (
          /* Role Selection */
          <div>
            <h2 className="font-display text-2xl font-bold text-green-900 mb-6 text-center">
              Choose Your Role
            </h2>
            <div className="flex justify-center">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setCurrentNode("arrive");
                  }}
                  className={`bg-gradient-to-br ${role.color} rounded-2xl p-8 text-white text-left shadow-lg hover:shadow-xl transition-shadow max-w-md w-full`}
                >
                  <span className="text-5xl block mb-3">{role.emoji}</span>
                  <h3 className="font-display text-2xl font-bold">
                    {role.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-2">
                    {role.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          /* Story */
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNode}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl shadow-lg border-2 border-green-200 overflow-hidden"
            >
              {/* Story Text */}
              <div className="p-8">
                <div className="text-center mb-4">
                  {nodeImages[currentNode] ? (
                    <Image
                      src={`/images/adventure/${nodeImages[currentNode]}.png`}
                      alt=""
                      width={200}
                      height={200}
                      className="mx-auto rounded-xl object-contain drop-shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <span className={`text-5xl ${nodeImages[currentNode] ? "hidden" : ""}`}>{node.emoji}</span>
                </div>
                <p className="text-gray-800 text-lg leading-relaxed">
                  {node.text}
                </p>
              </div>

              {/* Choices or Ending */}
              <div className="bg-green-50 p-6 border-t-2 border-green-100">
                {node.choices ? (
                  <div className="space-y-3">
                    <p className="font-display font-bold text-green-800 mb-3">
                      What do you do?
                    </p>
                    {node.choices.map((choice, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentNode(choice.nextId)}
                        className="w-full text-left px-5 py-4 bg-white rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors text-green-900 font-medium"
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                ) : node.ending ? (
                  <div className="text-center">
                    <h3 className="font-display text-2xl font-bold text-green-900 mb-3">
                      {node.ending.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {node.ending.description}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setCurrentNode("arrive")}
                        className="bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700"
                      >
                        🔄 Play Again
                      </button>
                      <button
                        onClick={resetAdventure}
                        className="bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full hover:bg-gray-300"
                      >
                        Back to Start
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
