"use client";
import React from "react";
import { Rubrique } from "@/lib/interfaces";
import RubriquesPickerHeader from "./RubriquesPickerHeader";
import RubriquesPickerChips from "./RubriquesPickerChips";
import RubriquesPickerGrid from "./RubriquesPickerGrid";
import RubriquesPickerLoading from "./RubriquesPickerLoading";
import { useRubriquesPickerSimple } from "@/hooks/rubriques/useRubriquesPickerSimple";

const RubriquesPickerSimple = React.memo(function RubriquesPickerSimple({
  rubriques,
  selectedIds,
  selectedSet,
  loading,
  onToggle,
  onRemove,
  onClear,
}: {
  rubriques: Rubrique[];
  selectedIds: string[];
  selectedSet: Set<string>;
  loading: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const { normalized, chips } = useRubriquesPickerSimple(rubriques, selectedIds);

  if (loading) {
    return <RubriquesPickerLoading />;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <RubriquesPickerHeader selectedCount={selectedIds.length} onClear={onClear} />
      <RubriquesPickerChips chips={chips} onRemove={onRemove} />
      <RubriquesPickerGrid normalized={normalized} selectedSet={selectedSet} onToggle={onToggle} />
    </div>
  );
});

export default RubriquesPickerSimple;