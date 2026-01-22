import { memo } from "react";

interface BackButtonProps {
  className?: string;
}

export const BackButton = memo(function BackButton({ className }: BackButtonProps) {
  const handleBack = () => {
    window.history.back();
  };
  return (
    <button
      onClick={handleBack}
      className={"mb-4 self-start px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 " + (className || "")}
      aria-label="Retour"
    >
      ← Retour
    </button>
  );
});
