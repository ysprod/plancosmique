"use client";
import ConsultationContentAdmin from "@/components/consultations/ConsultationContentAdmin";
import { useDisplayConsultationCard } from "@/hooks/admin/consultations/useDisplayConsultationCard";
import { cx } from "@/lib/functions";
import type { Consultation } from "@/lib/interfaces";
import { CopyToast } from "./DisplayConsultationCard/CopyToast";
import { TopBarActions } from "./DisplayConsultationCard/TopBarActions";

interface ConsultationCardProps {
  consultation: Consultation;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  notifiedback: boolean;
  onBack?: () => void;
}

function DisplayConsultationCard({ consultation, onModifyAnalysis, onNotifyUser, notifiedback, onBack }: ConsultationCardProps) {
  const { derived, copied, handleCopy, handleRefresh, handleNotify,
  } = useDisplayConsultationCard(consultation, notifiedback, onModifyAnalysis, onNotifyUser);
console.log("Rendu de DisplayConsultationCard avec la consultation :", consultation);
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
            copied={copied}
            handleCopy={handleCopy}
            handleRefresh={handleRefresh}
            handleNotify={handleNotify}
            onBack={onBack}
          />
          <CopyToast copied={copied} />
          <ConsultationContentAdmin
            consultation={consultation}
          />
        </div>
      </div>
    </main>
  );
}

DisplayConsultationCard.displayName = "DisplayConsultationCard";

export default DisplayConsultationCard;