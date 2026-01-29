import { memo } from "react";
import { Info } from "lucide-react";

const HintCard = memo(function HintCard() {
  return (
    <div className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/55 px-4 py-3">
      <div className="flex items-start justify-center text-center gap-2">
        <span className="mt-0.5 h-8 w-8 rounded-xl grid place-items-center bg-black/5 dark:bg-white/10">
          <Info className="h-4 w-4 text-slate-700 dark:text-slate-200" />
        </span>
        <p className="text-[12px] leading-snug text-slate-700 dark:text-slate-200">
          <span className="font-semibold">Important :</span> essayez d’indiquer une {" "}
          <span className="font-semibold">heure de naissance exacte</span> pour une analyse plus précise.
        </p>
      </div>
    </div>
  );
});
HintCard.displayName = "HintCard";

export default HintCard;
