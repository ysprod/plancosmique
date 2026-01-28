import type { Consultation } from "@/lib/interfaces";

interface ConsultationCardProps {
  consultation: Consultation;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  notifiedback: boolean;
}

export function consultationCardMemoComparator(prev: ConsultationCardProps, next: ConsultationCardProps): boolean {
  const p: Consultation = prev.consultation;
  const n: Consultation = next.consultation;

  if (p === n && prev.notifiedback === next.notifiedback) return true;

  const sameId = String(p?._id ?? "") === String(n?._id ?? "");
  const sameNotified = Boolean(p?.analysisNotified) === Boolean(n?.analysisNotified);
  const sameNotificationStatus = prev.notifiedback === next.notifiedback;

  const ps = p?.carteDuCiel?.sujet;
  const ns = n?.carteDuCiel?.sujet;
  const sameSujet =
    String(ps?.prenoms ?? "") === String(ns?.prenoms ?? "") &&
    String(ps?.nom ?? "") === String(ns?.nom ?? "") &&
    String(ps?.dateNaissance ?? "") === String(ns?.dateNaissance ?? "") &&
    String(ps?.heureNaissance ?? "") === String(ns?.heureNaissance ?? "") &&
    String(ps?.lieuNaissance ?? "") === String(ns?.lieuNaissance ?? "");

  const sameGenerationDate = String(p?.dateGeneration ?? "") === String(n?.dateGeneration ?? "");

  const sameHandlers = prev.onModifyAnalysis === next.onModifyAnalysis && prev.onNotifyUser === next.onNotifyUser;

  return sameId && sameNotified && sameNotificationStatus && sameSujet && sameGenerationDate && sameHandlers;
}
