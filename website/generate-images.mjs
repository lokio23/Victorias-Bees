import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load API key from .env in website/ directory
const envPath = path.join(__dirname, ".env");
let apiKey = process.env.GEMINI_API_KEY;
if (!apiKey && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  apiKey = envContent.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim();
}

if (!apiKey) {
  console.error("GEMINI_API_KEY not found. Set it in website/.env or as an environment variable.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const MODEL = "gemini-3.1-flash-image-preview"; // Nano Banana 2

// Load species data
const speciesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "lib/data/species.json"), "utf-8")
);

const SPECIES_DIR = path.join(__dirname, "public/images/species");
const ADVENTURE_DIR = path.join(__dirname, "public/images/adventure");

// Adventure scene definitions
const adventureScenes = [
  {
    id: "apiary-arrival",
    prompt: "A warm, inviting watercolor illustration of a child arriving at a bee apiary. Rows of white wooden beehive boxes sit in green grass under a sunny sky. A friendly beekeeper in a wide-brimmed hat waves hello. Soft, storybook style for children ages 9-12. Warm golden light, gentle greens and yellows. No text, no labels, no watermarks.",
  },
  {
    id: "suit-up",
    prompt: "A cheerful watercolor illustration of a child putting on a white beekeeper suit with a mesh veil and leather gloves. The child looks excited and a little nervous, like an astronaut gearing up. Bright, warm storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "smoker",
    prompt: "A detailed watercolor illustration of a bee smoker — a small metal canister with bellows attached, releasing gentle wisps of cool white smoke. Sitting on a wooden table near a beehive. Warm storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "pine-needles",
    prompt: "A cozy watercolor illustration of pine needles being stuffed into a bee smoker canister. A child's gloved hands push green pine needles into the metal smoker. Sweet woodsy feel, warm golden tones, storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "burlap",
    prompt: "A warm watercolor illustration of strips of tan burlap being loaded into a bee smoker canister. Thick white smoke curling up from the smoker. Earthy tones, storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "hive-box",
    prompt: "A detailed watercolor illustration of hands lifting the wooden lid off a white Langstroth beehive box. A warm golden glow rises from inside. Honeybees fly gently around the edges. Storybook style for kids ages 9-12, warm amber and green tones. No text, no labels, no watermarks.",
  },
  {
    id: "blocked-entrance",
    prompt: "A watercolor illustration of the front entrance of a beehive with many guard bees buzzing defensively around a visitor who got too close. The bees look alert but not angry. Educational storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "inspect-frame",
    prompt: "A beautiful watercolor illustration of a beekeeper and a child holding up a wooden hive frame covered with hundreds of honeybees. Golden honeycomb visible. Sunlight catches the wax. Warm, detailed storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "calm-approach",
    prompt: "A peaceful watercolor illustration of a child in a white bee suit standing very still and calm while a single honeybee crawls on their glove. The child looks focused and brave. Soft greens and golds, storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "eggs-discovery",
    prompt: "A close-up watercolor illustration of tiny white bee eggs standing upright in hexagonal honeycomb cells. Each egg is no bigger than a grain of rice. Warm golden wax tones, educational but artistic storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "queen-spotted",
    prompt: "A watercolor illustration of a queen honeybee on a frame surrounded by attendant worker bees. The queen is longer with a smooth shiny back and pointed abdomen. A circle of bees groom and feed her. Warm golden tones, storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "bee-landing",
    prompt: "A gentle watercolor illustration of a single honeybee landing on the back of a child's leather beekeeper glove. The bee's tiny feet touch the leather as her antennae tap curiously. Close-up view, warm and friendly, storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "ending-calm",
    prompt: "A proud watercolor illustration of a confident child in a beekeeper suit standing peacefully in an apiary, bees flying calmly around them. Zen-like composure, warm sunset lighting, storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "ending-observer",
    prompt: "A charming watercolor illustration of a child carefully placing a hive frame back into a beehive with gentle hands. Careful and respectful attitude. Green apiary background, warm storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "ending-apiarist",
    prompt: "A celebratory watercolor illustration of a beaming child in a bee suit who just found the queen bee on their very first hive inspection. Star-like sparkle in their eyes. Warm golden apiary, storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
  {
    id: "ending-smoker",
    prompt: "A heartwarming watercolor illustration of a child gently sliding a hive frame back into a beehive, treating the bees with great care and respect. A bee flies off their glove peacefully. Warm greens and golds, storybook style for kids ages 9-12. No text, no labels, no watermarks.",
  },
];

async function generateImage(prompt, outputPath, label) {
  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`  [skip] ${label} — already exists`);
    return outputPath;
  }

  try {
    console.log(`  [gen] ${label}...`);
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K",
        },
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(outputPath, buffer);
          console.log(`  [done] ${label} — saved`);
          return outputPath;
        }
      }
    }

    console.log(`  [warn] ${label} — no image in response`);
    return null;
  } catch (error) {
    console.error(`  [error] ${label}:`, error.message || error);
    return null;
  }
}

function buildSpeciesPrompt(species) {
  if (species.category === "product") {
    return `A detailed, vibrant illustration of ${species.name} — ${species.description} Beautiful, scientific accuracy with artistic flair, trading card portrait style. Rich golden and amber tones, warm lighting. Centered on a clean white background. No text, no labels, no watermarks.`;
  }
  return `A detailed, vibrant illustration of a ${species.name} (${species.scientificName}), a ${species.size}-sized ${species.social ? "social" : "solitary"} bee. ${species.description} Centered on a clean white background. Scientific accuracy with artistic flair, trading card portrait style. High detail on wings, body patterns, and fuzzy hairs. Warm golden lighting. No text, no labels, no watermarks.`;
}

async function main() {
  const args = process.argv.slice(2);
  const runSpecies = args.length === 0 || args.includes("--species");
  const runAdventure = args.length === 0 || args.includes("--adventure");

  console.log(`\n🐝 Victoria's Bees Image Generator`);
  console.log(`   Model: Nano Banana 2 (${MODEL})`);
  if (runSpecies) console.log(`   Species: ${speciesData.length} trading cards`);
  if (runAdventure) console.log(`   Adventure: ${adventureScenes.length} story scenes`);
  console.log();

  let success = 0;
  let failed = 0;

  // Generate species trading cards
  if (runSpecies) {
    fs.mkdirSync(SPECIES_DIR, { recursive: true });
    console.log("📋 Generating species trading cards...\n");

    for (const species of speciesData) {
      const outputPath = path.join(SPECIES_DIR, `${species.id}-trading-card.png`);
      const prompt = buildSpeciesPrompt(species);
      const result = await generateImage(prompt, outputPath, species.name);
      if (result) success++;
      else failed++;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  // Generate adventure scene illustrations
  if (runAdventure) {
    fs.mkdirSync(ADVENTURE_DIR, { recursive: true });
    console.log("\n📖 Generating adventure story scenes...\n");

    for (const scene of adventureScenes) {
      const outputPath = path.join(ADVENTURE_DIR, `${scene.id}.png`);
      const result = await generateImage(scene.prompt, outputPath, scene.id);
      if (result) success++;
      else failed++;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log(`\n✅ Done! Generated ${success} images, ${failed} failed.`);
}

main().catch(console.error);
