"use client";
import React, { useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAdminRubriquesPage } from "@/hooks/admin/useAdminRubriquesPage";
import { useAdminConsultations } from "@/hooks/consultations/useAdminConsultations";
import { useAdminOffrandes } from "@/hooks/admin/useAdminOffrandes";
import {
  useOfferingsIndex, useConsultationsByRubrique, useRubriquesWithConsultations,
} from "@/hooks/admin/useAssociationsIndexes";
import AssociationsHeader from "./associations/AssociationsHeader";
import RubriquesView from "./associations/RubriquesView";
import ChoicesView from "./associations/ChoicesView";
import DetailsView from "./associations/DetailsView";

type View =
  | { name: "rubriques" }
  | { name: "choices"; rubriqueId: string }
  | { name: "details"; rubriqueId: string; choiceId: string };

function getId(x: any): string | null {
  const raw = x?._id ?? x?.id;
  if (!raw) return null;
  if (typeof raw === "string") return raw;
  if (typeof raw === "object" && typeof raw.$oid === "string") return raw.$oid;
  if (typeof raw?.toString === "function") {
    const s = raw.toString();
    return s && s !== "[object Object]" ? s : null;
  }
  return null;
}

function AssociationsConsultationsOffrandes() {
  const { rubriques } = useAdminRubriquesPage();
  const { consultations } = useAdminConsultations();
  const { offerings } = useAdminOffrandes();

  const [view, setView] = useState<View>({ name: "rubriques" });

  const offeringsById = useOfferingsIndex(offerings ?? []);
  const consultationsByRubriqueId = useConsultationsByRubrique(consultations ?? []);
  const rubriquesWithConsultations = useRubriquesWithConsultations(
    rubriques ?? [],
    consultationsByRubriqueId
  );

  const openRubrique = useCallback((rubriqueId: string) => {
    setView({ name: "choices", rubriqueId });
  }, []);

  const openChoice = useCallback((rubriqueId: string, choiceId: string) => {
    setView({ name: "details", rubriqueId, choiceId });
  }, []);

  const goBack = useCallback(() => {
    setView((prev) => {
      if (prev.name === "details") return { name: "choices", rubriqueId: prev.rubriqueId };
      if (prev.name === "choices") return { name: "rubriques" };
      return prev;
    });
  }, []);

  const currentRubrique = useMemo(() => {
    if (view.name === "rubriques") return null;
    return rubriquesWithConsultations.find((r) => r.id === view.rubriqueId) ?? null;
  }, [view, rubriquesWithConsultations]);

  const currentChoices = useMemo(() => {
    if (view.name !== "choices" && view.name !== "details") return [];
    return consultationsByRubriqueId.get(view.rubriqueId) ?? [];
  }, [view, consultationsByRubriqueId]);

  const currentChoice = useMemo(() => {
    if (view.name !== "details") return null;
    const cid = view.choiceId;
    return currentChoices.find((c: any) => String(getId(c) ?? c?.id ?? "") === cid) ?? null;
  }, [view, currentChoices]);

  return (
    <div className="min-h-[70vh] rounded-3xl border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
      <AssociationsHeader
        viewName={view.name}
        rubriqueCount={rubriquesWithConsultations.length}
        onBack={goBack}
      />

      <AnimatePresence mode="wait" initial={false}>
        {view.name === "rubriques" && (
          <RubriquesView
            rubriques={rubriquesWithConsultations}
            onOpenRubrique={openRubrique}
          />
        )}

        {view.name === "choices" && (
          <ChoicesView
            rubriqueId={view.rubriqueId}
            rubrique={currentRubrique}
            choices={currentChoices}
            onOpenChoice={(choiceId) => openChoice(view.rubriqueId, choiceId)}
          />
        )}

        {view.name === "details" && (
          <DetailsView
            rubriqueId={view.rubriqueId}
            choiceId={view.choiceId}
            choice={currentChoice}
            offeringsById={offeringsById}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default AssociationsConsultationsOffrandes;