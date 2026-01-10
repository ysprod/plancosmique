import { useMemo } from "react";
import { formatDate } from "@/lib/functions";
import type { AnalyseAstrologique } from "@/lib/interfaces";

const useConsultationData = (consultation: AnalyseAstrologique) => {
  return useMemo(() => {
    const c: any = consultation;
    const sujet = c?.carteDuCiel?.sujet;
    const nomComplet = `${sujet?.prenoms || ''} ${sujet?.nom || ''}`.trim();
    const retrogradeCount = (c?.carteDuCiel?.positions || [])
      .filter((p: any) => p?.retrograde)
      .length;
    const dominantSign = (c?.carteDuCiel?.positions || [])
      .reduce((acc: Record<string, number>, pos: any) => {
        const sign = pos?.signe;
        if (sign) acc[sign] = (acc[sign] || 0) + 1;
        return acc;
      }, {});
    const mostFrequentSign = Object.entries(dominantSign)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || "Inconnu";
    return {
      id: c?._id || c?.consultationId,
      nomComplet,
      dateNaissance: sujet?.dateNaissance ? formatDate(sujet.dateNaissance) : "—",
      heureNaissance: sujet?.heureNaissance || "—",
      lieuNaissance: sujet?.lieuNaissance || "—",
      positions: c?.carteDuCiel?.positions || [],
      aspectsTexte: c?.carteDuCiel?.aspectsTexte || "",
      missionTitre: c?.missionDeVie?.titre || "Mission de Vie",
      missionContenu: c?.missionDeVie?.contenu || "",
      isNotifiedBackend: Boolean(c?.analysisNotified),
      dateGen: c?.dateGeneration ? new Date(c.dateGeneration).toLocaleDateString('fr-FR') : "—",
      retrogradeCount,
      mostFrequentSign,
      dominantSignCount: dominantSign[mostFrequentSign] || 0,
    };
  }, [consultation]);
};
export default useConsultationData;
