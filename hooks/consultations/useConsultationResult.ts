import { api } from "@/lib/api/client";
import type { Analysis } from "@/lib/interfaces";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function getIdFromParams(params: any): string | null {
  const raw = params?.id;
  if (!raw) return null;
  return Array.isArray(raw) ? String(raw[0] ?? "") : String(raw);
}

function isEmptyAnalysisPayload(data: any) {
  return data === "" || data === null || data === undefined;
}

export function useConsultationResult() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const consultationId = useMemo(() => getIdFromParams(params), [params]);
  const retour = useMemo(() => searchParams?.get("retour") || null, [searchParams]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<Analysis | null>(null);

  const didRunRef = useRef<string | null>(null);
  const seqRef = useRef(0);

  useEffect(() => {
    if (!consultationId) {
      setLoading(false);
      setError("Identifiant de consultation manquant");
      return;
    }

    // 1 seule exécution par consultationId
    if (didRunRef.current === consultationId) return;
    didRunRef.current = consultationId;

    const mySeq = ++seqRef.current;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const response = await api.get(`/analyses/by-consultation/${consultationId}`);

        if (seqRef.current !== mySeq) return;

        const data = response?.data;

        // Si l’API renvoie vide => on redirige vers la page génération
        if (isEmptyAnalysisPayload(data)) {
          router.replace(`/star/consultations/${consultationId}/generated?retour=${retour || ""}`);
          return; // important: ne pas setLoading(false) après replace
        }

        setAnalyse(data);
        setLoading(false);
      } catch (err: any) {
        if (seqRef.current !== mySeq) return;

        setError("Impossible de récupérer l'analyse");
        setLoading(false);
      }
    })();
  }, [consultationId, router]);

  const handleBack = useCallback(() => {
    if (retour === "cinqportes") {
      router.push("/star/cinqportes");
      return;
    }
    if (retour === "carteduciel") {
      router.push("/star/carteduciel");
      return;
    }
    router.push("/star/consultations");
  }, [router, retour]);

  const handleDownloadPDF = useCallback(() => {
    if (!consultationId) return;
    window.open(`/api/consultations/${consultationId}/download-pdf`, "_blank");
  }, [consultationId]);

  return { loading, error,   analyse, handleBack, handleDownloadPDF, retour };
}
