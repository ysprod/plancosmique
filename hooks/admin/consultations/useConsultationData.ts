import { formatDate } from "@/lib/functions";
import { AnalyseAstrologique } from "@/lib/interfaces";
import { useMemo } from "react";


const useConsultationData = (consultation: AnalyseAstrologique) => {
  return useMemo(() => {
    // Detect numerology analysis by presence of numerology fields
    const isNumerology = !!(
      consultation?.themeDeNaissance ||
      consultation?.cyclesEnMouvement ||
      consultation?.analyseNumerologique
    );

    if (isNumerology) {
      // Numerology analysis structure
      const theme = consultation.themeDeNaissance || {};
      const cycles = consultation.cyclesEnMouvement || [];
      const analyse = consultation.analyseNumerologique || {};
      const sujet = consultation.sujet || {};
      const nomComplet = `${(sujet && 'prenoms' in sujet ? sujet.prenoms : '') || ''} ${(sujet && 'nom' in sujet ? sujet.nom : '') || ''}`.trim();
      return {
        id: consultation?.consultationId || consultation?._id,
        nomComplet,
        dateNaissance:
          (sujet && 'dateNaissance' in sujet && typeof sujet.dateNaissance === 'string' && sujet.dateNaissance)
            ? formatDate(sujet.dateNaissance)
            : '—',
        heureNaissance: (sujet && 'heureNaissance' in sujet && typeof sujet.heureNaissance === 'string' && sujet.heureNaissance)
          ? sujet.heureNaissance
          : '—',
        lieuNaissance: (sujet && 'lieuNaissance' in sujet && typeof sujet.lieuNaissance === 'string' && sujet.lieuNaissance)
          ? sujet.lieuNaissance
          : '—',
        themeDeNaissance: theme,
        cyclesEnMouvement: cycles,
        analyseNumerologique: analyse,
        isNotifiedBackend: Boolean(consultation?.analysisNotified),
        dateGen: consultation?.dateGeneration ? new Date(consultation.dateGeneration).toLocaleDateString('fr-FR') : '—',
        type: 'numerologie',
        positions: [], // Always provide positions for type compatibility
        missionContenu: '', // Always provide missionContenu as string
        syntheseEtTiming: consultation.syntheseEtTiming || undefined,
        cyclesDeVieGrands: consultation.cyclesDeVieGrands || undefined,
        sagesseAfricaine: consultation.sagesseAfricaine || undefined,
      };
    }

    // Default: astrology analysis
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
      .sort(([, a], [, b]) => (b as number) - (a as number))[0]?.[0] || "Inconnu";
    return {
      id: c?.consultationId || c?._id,
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
      type: 'astrologie',
    };
  }, [consultation]);
};

export default useConsultationData;
