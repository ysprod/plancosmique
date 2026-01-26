"use client";
import { useHoroscopeSummary } from "@/hooks/consultations/useHoroscopeSummary";
import { cx } from "@/lib/functions";
import type { Consultation } from "@/lib/interfaces";
import { motion, useReducedMotion } from "framer-motion";
import React, { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ConsultationHeader from "./content/ConsultationHeader";
import HoroscopeSummary from "./content/HoroscopeSummary";

type Kind = "numerology" | "astrology" | "horoscope_fallback";

function normalizeType(t: any) {
  return String(t ?? "").trim().toLowerCase().replace(/_/g, "-");
}

function getKindFromType(typeRaw: any): Kind {
  const t = normalizeType(typeRaw);

  if (t === "nombres-personnels" || t === "cycles-personnels" || t === "numerologie" || t === "numerology") {
    return "numerology";
  }
  if (t === "vie-personnelle" || t === "astrologie-africaine" || t === "transits" || t === "astrologie" || t === "astro" || t === "carte-du-ciel") {
    return "astrology";
  }
  return "horoscope_fallback";
}

function extractMarkdown(c: any): string | null {
  const v =
    c?.analyse?.analyse?.texte ??
    c?.resultData?.analyse?.texte ??
    c?.analyse?.analyse ??
    c?.resultData?.analyse ??
    null;

  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : null;
}


const cardVariants = {
  initial: { opacity: 0, y: 8, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.14 } },
  exit: { opacity: 0, y: 8, scale: 0.995, transition: { duration: 0.12 } },
};

const ShellCard = memo(function ShellCard({
  children,
}: {
  children: React.ReactNode;

}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px] border",
        "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
        "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
      )}
    >
      {children}
    </div>
  );
});

const MarkdownCard = memo(function MarkdownCard({ markdown }: { markdown: string }) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-2xl",
        "dark:border-zinc-800/70 dark:bg-zinc-900/40 mb-4"
      )}
    >
      <article className="prose prose-sm max-w-none text-left dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </div>
  );
});

export interface ConsultationContentAdminProps {
  consultation: Consultation;
}

function ConsultationContentAdmin({ consultation }: ConsultationContentAdminProps) {
  const reduceMotion = useReducedMotion();
  const kind = useMemo(() => getKindFromType((consultation as any)?.type), [consultation]);
  const markdown = useMemo(() => extractMarkdown(consultation as any), [consultation]);

  const horoscope = kind === "horoscope_fallback" ? useHoroscopeSummary(consultation) : null;

  return (
    <ShellCard>
      <ConsultationHeader
        titre={(consultation as any).titre}
        title={(consultation as any).title}
      />
      {markdown ? (
        <motion.div key="md" variants={cardVariants} initial="initial" animate="animate" exit="exit">
          <MarkdownCard markdown={markdown} />
        </motion.div>
      ) : (
        <div
          className={cx(
            "mx-auto w-full max-w-2xl",
            "rounded-3xl border p-4 sm:p-5",
            "border-slate-200/70 bg-white/60",
            "dark:border-zinc-800/70 dark:bg-zinc-900/40"
          )}
        >
          <HoroscopeSummary horoscope={horoscope} />
          {!reduceMotion && (
            <motion.div
              className="mx-auto mt-4 h-[2px] w-28 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/80"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      )}
    </ShellCard>
  );
}

ConsultationContentAdmin.displayName = "ConsultationContentAdmin";

export default ConsultationContentAdmin;