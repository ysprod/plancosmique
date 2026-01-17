export type CategoryKey = "animal" | "vegetal" | "beverage";

export const CATEGORIES: Array<{
  value: CategoryKey;
  label: string;
  emoji: string;
  color: string;
}> = [
  { value: "animal", label: "Animaux", emoji: "🐓", color: "from-red-500 to-orange-500" },
  { value: "vegetal", label: "Végétaux", emoji: "🌾", color: "from-green-500 to-emerald-500" },
  { value: "beverage", label: "Boissons", emoji: "🥤", color: "from-blue-500 to-indigo-500" },
];
