import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

export function getGenAI() {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
}

export async function generateBeeImage(
  speciesName: string,
  style: "trading-card" | "educational" | "character" | "habitat" = "trading-card",
  outputPath?: string
): Promise<string | null> {
  const stylePrompts: Record<string, string> = {
    "trading-card": `A detailed, vibrant illustration of a ${speciesName} bee, centered on a clean white background. Scientific accuracy with artistic flair, trading card portrait style. High detail on wings, body patterns, and fuzzy hairs. Warm golden lighting. No text or labels.`,
    educational: `An educational scientific illustration of a ${speciesName} bee, showing clear anatomical detail. Kid-friendly but scientifically accurate style. Warm color palette with amber and green accents. Clean white background. No text or labels.`,
    character: `A friendly, appealing cartoon character illustration of a ${speciesName} bee with expressive eyes and warm personality. Pixar-style appeal, suitable for children ages 9-12. Clean background. No text.`,
    habitat: `A beautiful illustration of a ${speciesName} bee in its natural habitat, visiting flowers. Lush environment with sunlight filtering through. Nature documentary quality but in an illustrated watercolor style. No text.`,
  };

  const prompt = stylePrompts[style];

  try {
    const ai = getGenAI();
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

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          if (imageData && outputPath) {
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync(outputPath, buffer);
            console.log(`Image saved to ${outputPath}`);
            return outputPath;
          }
          return imageData || null;
        }
      }
    }

    return null;
  } catch (error) {
    console.error(`Error generating image for ${speciesName}:`, error);
    return null;
  }
}
