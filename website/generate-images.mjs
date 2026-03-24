import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Load API key from .env
const envPath = path.join(ROOT, ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const apiKey = envContent.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim();

if (!apiKey) {
  console.error("GEMINI_API_KEY not found in .env");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Load species data
const speciesData = JSON.parse(
  fs.readFileSync(path.join(ROOT, "assets/data/species.json"), "utf-8")
);

const OUTPUT_DIR = path.join(ROOT, "website/public/images/species");

async function generateImage(species, style = "trading-card") {
  const outputPath = path.join(OUTPUT_DIR, `${species.id}-${style}.png`);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`  [skip] ${species.name} (${style}) — already exists`);
    return outputPath;
  }

  const prompts = {
    "trading-card": `A detailed, vibrant illustration of a ${species.name} (${species.scientificName}), a ${species.size}-sized ${species.social ? "social" : "solitary"} bee. ${species.description} Centered on a clean white background. Scientific accuracy with artistic flair, trading card portrait style. High detail on wings, body patterns, and fuzzy hairs. Warm golden lighting. No text, no labels, no watermarks.`,
    character: `A friendly, appealing cartoon character illustration of a ${species.name} bee (${species.scientificName}). ${species.description} Pixar-style appeal with expressive eyes and warm personality, suitable for children ages 9-12. Clean background, no text.`,
  };

  const prompt = prompts[style] || prompts["trading-card"];

  try {
    console.log(`  [gen] ${species.name} (${style})...`);
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
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
          console.log(`  [done] ${species.name} — saved to ${path.basename(outputPath)}`);
          return outputPath;
        }
      }
    }

    console.log(`  [warn] ${species.name} — no image in response`);
    return null;
  } catch (error) {
    console.error(`  [error] ${species.name}:`, error.message || error);
    return null;
  }
}

async function main() {
  console.log(`\n🐝 Honey Beez Image Generator`);
  console.log(`   Using: Gemini Nano Banana 2 (gemini-3.1-flash-image-preview)`);
  console.log(`   Species: ${speciesData.length}`);
  console.log(`   Output: ${OUTPUT_DIR}\n`);

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let success = 0;
  let failed = 0;

  // Generate trading card images for all species (one at a time to avoid rate limits)
  for (const species of speciesData) {
    const result = await generateImage(species, "trading-card");
    if (result) success++;
    else failed++;

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n✅ Done! Generated ${success} images, ${failed} failed.`);
  console.log(`   Images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
