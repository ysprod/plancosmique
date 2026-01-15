"use client";

import { AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import { memo } from "react";
import ConsultationChoiceCard from "./ConsultationChoiceCard";
import type { ConsultationChoice, Offering } from "@/lib/interfaces";

interface ChoicesListViewProps {
  choices: ConsultationChoice[];
  onUpdateChoice: (index: number, updated: ConsultationChoice) => void;
  onDeleteChoice: (index: number) => void;
  offerings: Offering[];
}

const ChoicesListView = memo(function ChoicesListView({
  choices,
  onUpdateChoice,
  onDeleteChoice,
  offerings,
}: ChoicesListViewProps) {
  if (choices.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400">
        <Package className="mx-auto mb-3 h-12 w-12 opacity-50" />
        <p className="text-sm">Aucun choix ajouté</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {choices.map((choice, index) => (
          <ConsultationChoiceCard
            key={index}
            choice={choice}
            index={index}
            onUpdate={(updated) => onUpdateChoice(index, updated)}
            onDelete={() => onDeleteChoice(index)}
            offerings={offerings}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

ChoicesListView.displayName = "ChoicesListView";
export default ChoicesListView;
