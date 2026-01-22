import { memo } from "react";

interface ChoicesWithCountBadgeProps {
  count: number;
  loading?: boolean;
  error?: string | null;
}

export const ChoicesWithCountBadge = memo(function ChoicesWithCountBadge({ count, loading, error }: ChoicesWithCountBadgeProps) {
  if (loading) return <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white text-xs animate-pulse">Chargement...</span>;
  if (error) return <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs">Erreur</span>;
  return (
    <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white text-xs font-bold shadow">
      {count} consultations
    </span>
  );
});
