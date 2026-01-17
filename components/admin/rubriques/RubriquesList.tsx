'use client';
import { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import React from "react";

interface RubriquesListProps {
  rubriques: Rubrique[];
  selectedRubrique: Rubrique | null;
  onSelect: (rubrique: Rubrique) => void;
  onDelete: (id: string) => void;
}

export function RubriquesList({ rubriques, selectedRubrique, onSelect, onDelete }: RubriquesListProps) {
  return (
    <div className="space-y-3">
      {rubriques.map((rub) => (
        <motion.div
          key={rub._id}
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            onSelect(rub);
          }}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedRubrique?._id === rub._id
            ? "border-violet-500 bg-violet-50 shadow-lg"
            : "border-slate-200 bg-white hover:border-slate-300"
            }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{rub.titre}</h3>
              {rub.categorieId && (
                <div className="text-xs text-violet-700 font-semibold mb-1">Categorie : {rub.categorieId.nom}</div>
              )}
              {rub.typeconsultation && (
                <div className="text-xs text-orange-700 font-semibold mb-1">Type : {rub.typeconsultation}</div>
              )}
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{rub.description}</p>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2"># {rub._id}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold text-violet-600">
                  {rub.consultationChoices.length} choix
                </span>
              </div>
            </div>
            <button
              onClick={e => {
                e.stopPropagation();
                onDelete(rub._id!);
              }}
              className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}