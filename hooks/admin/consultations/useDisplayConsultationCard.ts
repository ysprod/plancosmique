import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getConsultationId, extractMarkdown, formatDateFR } from "@/components/admin/consultations/DisplayConsultationCard/helpers";
import type { Consultation } from "@/lib/interfaces";

export function useDisplayConsultationCard(consultation: Consultation, notifiedback: boolean, onModifyAnalysis: (id: string) => void, onNotifyUser: (id: string) => void) {
  const derived = useMemo(() => {
    const c: any = consultation;
    const id = getConsultationId(c);
    const markdown = extractMarkdown(c);
    const dateGenRaw = c?.dateGeneration ?? c?.updatedAt ?? c?.createdAt ?? null;
    const dateGenLabel = formatDateFR(dateGenRaw);
    const isNotifiedBackend = Boolean(c?.analysisNotified);
    const isNotified = Boolean(notifiedback || isNotifiedBackend);
    return { id, markdown, dateGenLabel, isNotified };
  }, [consultation, notifiedback]);

  // Copy UX (auto reset)
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (!derived.markdown) return;
    try {
      await navigator.clipboard.writeText(derived.markdown);
      setCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1200);
    } catch {}
  }, [derived.markdown]);

  const handleRefresh = useCallback(() => {
    if (!derived.id) return;
    onModifyAnalysis(derived.id);
  }, [derived.id, onModifyAnalysis]);

  const handleNotify = useCallback(() => {
    if (!derived.id || derived.isNotified) return;
    onNotifyUser(derived.id);
  }, [derived.id, derived.isNotified, onNotifyUser]);

    const markdown = useMemo(() => extractMarkdown(consultation), [consultation]);

  return {
    derived,
    copied,
    setCopied,
    handleCopy,
    handleRefresh,
    handleNotify,
    markdown,
  };
}
