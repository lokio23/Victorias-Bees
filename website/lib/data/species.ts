import speciesData from "./species.json";

export interface BeeSpecies {
  id: string;
  name: string;
  scientificName: string;
  rarity: "common" | "rare" | "legendary";
  category: "breed" | "caste" | "product";
  description: string;
  habitat: string;
  diet: string;
  social: boolean;
  colonySize: string;
  stats: {
    pollinationPower: number;
    speed: number;
    range: number;
    socialLevel: number;
  };
  funFact: string;
  culturalNote: string;
  superpower: string;
  region: string;
  size: string;
  pack: number;
}

export const allSpecies: BeeSpecies[] = speciesData as BeeSpecies[];

export function getSpeciesByPack(pack: number): BeeSpecies[] {
  return allSpecies.filter((s) => s.pack === pack);
}

export function getSpeciesByRarity(rarity: BeeSpecies["rarity"]): BeeSpecies[] {
  return allSpecies.filter((s) => s.rarity === rarity);
}

export function getSpeciesById(id: string): BeeSpecies | undefined {
  return allSpecies.find((s) => s.id === id);
}

export function getSpeciesByCategory(category: BeeSpecies["category"]): BeeSpecies[] {
  return allSpecies.filter((s) => s.category === category);
}

export function getBreeds(): BeeSpecies[] {
  return allSpecies.filter((s) => s.category === "breed");
}

export function getCastes(): BeeSpecies[] {
  return allSpecies.filter((s) => s.category === "caste");
}

export function getProducts(): BeeSpecies[] {
  return allSpecies.filter((s) => s.category === "product");
}

export const rarityColors = {
  common: { bg: "bg-green-100", border: "border-green-400", text: "text-green-800", badge: "bg-green-500" },
  rare: { bg: "bg-blue-100", border: "border-blue-400", text: "text-blue-800", badge: "bg-blue-500" },
  legendary: { bg: "bg-amber-100", border: "border-amber-400", text: "text-amber-800", badge: "bg-amber-500" },
};

export const categoryColors = {
  breed: { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-800", label: "Breed" },
  caste: { bg: "bg-purple-50", border: "border-purple-300", text: "text-purple-800", label: "Colony Role" },
  product: { bg: "bg-teal-50", border: "border-teal-300", text: "text-teal-800", label: "Hive Product" },
};
