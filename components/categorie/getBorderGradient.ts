import { hashString } from "@/lib/functions";

export const borderGradients = [
  "from-red-500 via-orange-500 to-pink-500",
  "from-violet-600 via-indigo-600 to-blue-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-rose-500 via-fuchsia-500 to-purple-500",
  "from-amber-500 via-yellow-500 to-orange-500",
] as const;

export function getBorderGradientFromId(id: string): (typeof borderGradients)[number] {
  const h = hashString(id);
  return borderGradients[h % borderGradients.length];
}
