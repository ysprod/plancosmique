"use client";
import { useDisplayConsultationCard } from "@/hooks/admin/consultations/useDisplayConsultationCard";
import { cx } from "@/lib/functions";
import type { Consultation } from "@/lib/interfaces";
import React, { memo, useMemo } from "react";

import { CopyToast } from "./DisplayConsultationCard/CopyToast";
import { TopBarActions } from "./DisplayConsultationCard/TopBarActions";
import ConsultationHeader from "@/components/consultations/content/ConsultationHeader";
import MarkdownCard from "@/components/consultations/content/MarkdownCard";



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

interface ConsultationCardProps {
  consultation: Consultation;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  notifiedback: boolean;
  onBack?: () => void;
}

function DisplayConsultationCard({ consultation, onModifyAnalysis, onNotifyUser, notifiedback, onBack }: ConsultationCardProps) {
  const { derived, copied, handleCopy, handleRefresh, handleNotify, markdown
  } = useDisplayConsultationCard(consultation, notifiedback, onModifyAnalysis, onNotifyUser);


  if (!consultation) return null;

  return (
    <main
      className={cx(
        "mx-auto w-full px-3 py-4 sm:px-4 sm:py-6",
        "flex flex-col items-center justify-center text-center",
      )}
    >
      <div className="mx-auto w-full max-w-3xl">
        <div
          className={cx(
            "relative overflow-hidden rounded-[28px] border",
            "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
            "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
          )}
        >
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />
          <TopBarActions
            derived={derived} 
            handleRefresh={handleRefresh}
            handleNotify={handleNotify}
            onBack={onBack}
          />
          <CopyToast copied={copied} />
          <ShellCard>
            <ConsultationHeader
              title={consultation.title}
            />
            <MarkdownCard markdown={markdown!} />
          </ShellCard>
        </div>
      </div>
    </main>
  );
}

DisplayConsultationCard.displayName = "DisplayConsultationCard";

export default DisplayConsultationCard;