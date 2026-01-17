"use client";
import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import ChoiceRow from "./ChoiceRow";
import { pageVariants } from "./animations";
import { shortDesc, safeText } from "@/hooks/admin/useAssociationsUtils";

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

const ChoicesView = memo(function ChoicesView({
  rubriqueId,
  rubrique,
  choices,
  onOpenChoice,
}: {
  rubriqueId: string;
  rubrique: { titre: string; description: string } | null;
  choices: any[];
  onOpenChoice: (choiceId: string) => void;
}) {
  return (
    <motion.div
      key={`choices-${rubriqueId}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.18 }}
      className="space-y-2"
    >
      <div className="rounded-3xl border border-slate-200 bg-white/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="text-[13px] font-extrabold text-slate-900 dark:text-white">
          {rubrique?.titre ?? "Rubrique"}
        </div>
        <div className="mt-0.5 text-[12px] text-slate-600 dark:text-zinc-300">
          {shortDesc(rubrique?.description ?? "—", 180)}
        </div>
      </div>

      <motion.div
        className="space-y-2"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.03 }}
      >
        {choices.map((c: any) => {
          const cid = String(getId(c) ?? c?.id ?? "");
          const title = safeText(c?.titre ?? c?.title ?? "Consultation");
          const desc = safeText(c?.description ?? "");
          return (
            <ChoiceRow
              key={cid}
              title={title}
              description={desc}
              onOpen={() => onOpenChoice(cid)}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
});

export default ChoicesView;
