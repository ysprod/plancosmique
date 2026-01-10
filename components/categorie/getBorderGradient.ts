// Utilitaire pour obtenir le gradient de bordure d'une rubrique
const borderGradients = [
  "from-red-500 via-orange-500 to-pink-500",
  "from-violet-600 via-indigo-600 to-blue-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-rose-500 via-fuchsia-500 to-purple-500",
  "from-amber-500 via-yellow-500 to-orange-500",
];

export function getBorderGradient(id: string): string {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return borderGradients[hash % borderGradients.length];
}
