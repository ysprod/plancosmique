"use client";
import { cx } from "@/lib/functions";
import type { Consultation } from "@/lib/interfaces";
import React, { memo, useMemo } from "react";
import ConsultationHeader from "./content/ConsultationHeader";
import MarkdownCard from "./content/MarkdownCard";

function extractMarkdown(c: Consultation): string | null {
  const v = c?.analyse?.analyse?.texte ?? c?.resultData?.analyse?.texte ??
    c?.analyse?.analyse ?? c?.resultData?.analyse ??
    null;

  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : null;
}

const ShellCard = memo(function ShellCard({ children, }: { children: React.ReactNode; }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden",
        "border-slate-200/90 bg-white shadow-xl shadow-black/5 backdrop-blur",
        "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
      )}
    >
      {children}
    </div>
  );
});


export interface ConsultationContentAdminProps {
  consultation: Consultation;
}

function ConsultationContentAdmin({ consultation }: ConsultationContentAdminProps) {
  const markdown = useMemo(() => extractMarkdown(consultation), [consultation]);

  return (
    <ShellCard>
      <ConsultationHeader
        titre={consultation.titre}
        title={consultation.title}
      />
      <MarkdownCard markdown={markdown!} />
    </ShellCard>
  );
}

ConsultationContentAdmin.displayName = "ConsultationContentAdmin";

export default ConsultationContentAdmin;