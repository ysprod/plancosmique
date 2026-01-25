"use client";

import type { Consultation } from "@/lib/interfaces";
import { memo, useState } from "react";
import ConsultationContent from "@/components/consultations/ConsultationContent";
import { Button } from "@/components/commons/Button";
import { Copy, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";


interface ConsultationCardProps {
  consultation: Consultation;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  notifiedback: boolean;
  onBack?: () => void;
}


const DisplayConsultationCard = memo(function DisplayConsultationCard({ consultation, onModifyAnalysis, onNotifyUser, notifiedback, onBack }: ConsultationCardProps) {
  const [copied, setCopied] = useState(false);
  const markdown = (() => {
    const c = consultation as any;
    return c?.analyse?.analyse?.texte || c?.resultData?.analyse?.texte || c?.analyse?.analyse || c?.resultData?.analyse || null;
  })();
  const dateGen = (consultation as any)?.dateGeneration || (consultation as any)?.updatedAt || (consultation as any)?.createdAt;
  const isNotified = !!notifiedback;

  const handleCopy = () => {
    if (markdown) {
      navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="relative">
  
        <Button size="sm" variant="ghost" className="mb-2" onClick={onBack}>
          ← Retour
        </Button>
   
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Button size="sm" variant="outline" onClick={handleCopy} disabled={!markdown} title="Copier l'analyse Markdown">
          <Copy className="w-4 h-4 mr-1" />
          {copied ? "Copié !" : "Copier l'analyse"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onModifyAnalysis(consultation._id || consultation.id)} title="Rafraîchir/Re-générer">
          <RefreshCw className="w-4 h-4 mr-1" />Rafraîchir
        </Button>
        <span className="inline-flex items-center gap-1 text-xs font-semibold">
          {isNotified ? (
            <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Notifié</>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-500" /> Non notifié
              <Button size="sm" variant="default" className="ml-2" onClick={() => onNotifyUser(consultation._id || consultation.id)}>
                Notifier l'utilisateur
              </Button>
            </>
          )}
        </span>
        {dateGen && (
          <span className="ml-2 text-xs text-slate-500">Généré le {new Date(dateGen).toLocaleString("fr-FR")}</span>
        )}
      </div>
      <ConsultationContent consultation={consultation} />
    </div>
  );
});

DisplayConsultationCard.displayName = "DisplayConsultationCard";

export default DisplayConsultationCard;