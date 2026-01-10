"use client";
import useConsultationData from "@/hooks/admin/consultations/useConsultationData";
import type { AnalyseAstrologique } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Calendar, Clock, Compass, Crown, Edit, Mail, MapPin, Plane, ScrollText, Sparkles, Target, Telescope, User } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import type { TabKey } from "./DisplayConsultationCard.types";
import { cx } from "./DisplayConsultationCard.utils";
import PlanetChip from "./PlanetChip";
import Tabs from "./Tabs";

interface ConsultationCardProps {
  consultation: AnalyseAstrologique;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  notifiedback: boolean;
}

const DisplayConsultationCard = memo(
  function DisplayConsultationCard({
    consultation,
    onModifyAnalysis,
    onNotifyUser,
    notifiedback,
  }: ConsultationCardProps) {
    const derived = useConsultationData(consultation);
    const renderCount = useRef(0);
    renderCount.current++;

    const [tab, setTab] = useState<TabKey>("resume");
    const [aspectsOpen, setAspectsOpen] = useState(false);
    const [notifiedLocal, setNotifiedLocal] = useState(notifiedback || derived.isNotifiedBackend);

    useEffect(() => {
      setNotifiedLocal(notifiedback || derived.isNotifiedBackend);
    }, [notifiedback, derived.isNotifiedBackend]);

    const isNotified = notifiedLocal || derived.isNotifiedBackend;

    const handleModify = useCallback(() => {
      if (derived.id) onModifyAnalysis(derived.id);
    }, [derived.id, onModifyAnalysis]);

    const handleNotify = useCallback(() => {
      if (!derived.id || isNotified) return;
      setNotifiedLocal(true);
      onNotifyUser(derived.id);
    }, [derived.id, isNotified, onNotifyUser]);

    const visiblePositions = useMemo(() =>
      derived.positions.slice(0, 20),
      [derived.positions]
    );

    const firstMissionLine = useMemo(() => {
      const lines = derived.missionContenu.split('\n').filter((l: string) => l.trim());
      return lines[0]?.replace(/^##\s*/, '') || "Mission de vie disponible";
    }, [derived.missionContenu]);

    const cardVariants = {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 280,
          damping: 25,
          mass: 0.8
        }
      },
      exit: { opacity: 0, y: -10, scale: 0.98 }
    };

    const tabVariants = {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 10 }
    };

    if (!derived.id || !derived.nomComplet) return null;

    return (
      <motion.article
        variants={cardVariants}
        initial="initial"
        animate="animate"
        layoutId={`consultation-${derived.id}`}
        className={cx(
          "group relative isolate overflow-hidden rounded-4xl p-4",
          "bg-gradient-to-br from-white/95 via-white/90 to-white/95",
          "shadow-2xl shadow-black/5 backdrop-blur-xl",
          "border border-white/40 dark:border-zinc-800/40",
          "dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-900/95",
          "dark:shadow-black/30 sm:p-5"
        )}
      >
       
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-500/10 to-cyan-500/5 blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Étoiles animées */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-[1px] rounded-full bg-gradient-to-r from-white/50 to-yellow-200/50"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Header avec statistiques */}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
                  <User className="h-6 w-6 text-white" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <motion.div
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-sm"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-[10px] font-black text-white">
                    {derived.retrogradeCount}
                  </span>
                </motion.div>
              </motion.div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  {derived.nomComplet}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-slate-100 to-white px-2 py-1 text-[11px] font-extrabold text-slate-700 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-200">
                    <Sparkles className="h-3 w-3" />
                    Analyse astrologique
                  </span>

                  <motion.span
                    className={cx(
                      "rounded-full px-2 py-1 text-[10px] font-extrabold",
                      isNotified
                        ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-200"
                        : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-200"
                    )}
                    animate={isNotified ? {
                      boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0)", "0 0 0 4px rgba(16, 185, 129, 0.3)", "0 0 0 0 rgba(16, 185, 129, 0)"]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isNotified ? "✓ NOTIFIÉ" : "À NOTIFIER"}
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Mini-stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:flex flex-col gap-2"
            >
              <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-3 dark:from-zinc-800/50 dark:to-zinc-900/50">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {derived.retrogradeCount}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-zinc-400">
                    Planètes R
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Infos sujet compactes */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm dark:from-zinc-800/50 dark:to-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-2">
                  <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-slate-900 dark:text-white">
                    {derived.dateNaissance}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">
                    Naissance
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm dark:from-zinc-800/50 dark:to-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-2">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-slate-900 dark:text-white">
                    {derived.heureNaissance}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">
                    Heure
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm dark:from-zinc-800/50 dark:to-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-2">
                  <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-slate-900 dark:text-white">
                    {derived.lieuNaissance.substring(0, 20)}
                    {derived.lieuNaissance.length > 20 ? '…' : ''}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">
                    Lieu
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm dark:from-zinc-800/50 dark:to-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-2">
                  <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-slate-900 dark:text-white">
                    {derived.mostFrequentSign}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">
                    Signe dominant
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions principales */}
          <div className="mt-4 flex gap-3">
            <ActionButton
              onClick={handleNotify}
              icon={Mail}
              label={isNotified ? "Déjà notifié" : "Notifier l'utilisateur"}
              gradient="from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
              disabled={isNotified}
            />
            <ActionButton
              onClick={handleModify}
              icon={Edit}
              label="Modifier l'analyse"
              gradient="from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            />
          </div>

          {/* Tabs améliorés */}
          <Tabs tab={tab} setTab={setTab} />

          {/* Contenu des tabs avec AnimatePresence */}
          <div className="mt-4 min-h-[300px]">
            <AnimatePresence mode="wait">
              {tab === "resume" && (
                <motion.div
                  key="resume"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl dark:from-zinc-900 dark:to-zinc-800"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 p-3">
                      <Brain className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        Synthèse de la mission
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-zinc-400">
                        Résumé automatiquement généré
                      </p>
                    </div>
                  </div>

                  <motion.p
                    className="text-[14px] leading-relaxed text-slate-700 dark:text-zinc-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {firstMissionLine}
                  </motion.p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-4 dark:from-zinc-800/50 dark:to-zinc-900/50">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-amber-600" />
                        <span className="text-[12px] font-bold">Mission principale</span>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-600">
                        Transmutation des connaissances en sagesse créative
                      </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-4 dark:from-zinc-800/50 dark:to-zinc-900/50">
                      <div className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-blue-600" />
                        <span className="text-[12px] font-bold">Chemin d'évolution</span>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-600">
                        Nœud Nord en Sagittaire, Maison 5
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {tab === "carte" && (
                <motion.div
                  key="carte"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  {/* Positions planétaires */}
                  <div className="rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl dark:from-zinc-900 dark:to-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3">
                          <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">
                            Positions planétaires
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-zinc-400">
                            {derived.positions.length} positions analysées
                          </p>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        onClick={() => setAspectsOpen(!aspectsOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-xl bg-gradient-to-r from-slate-100 to-white px-4 py-2 text-[12px] font-bold text-slate-700 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-200"
                      >
                        <div className="flex items-center gap-2">
                          <ScrollText className="h-4 w-4" />
                          {aspectsOpen ? "Masquer" : "Afficher"} aspects
                        </div>
                      </motion.button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {visiblePositions.map((pos: any, idx: number) => (
                        <PlanetChip key={`${pos.planete}-${idx}`} {...pos} />
                      ))}
                    </div>
                  </div>

                  {/* Aspects texte */}
                  <AnimatePresence>
                    {aspectsOpen && (
                      <motion.div
                        key="aspects"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl dark:from-zinc-900 dark:to-zinc-800"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3">
                            <Telescope className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white">
                              Aspects détaillés
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                              Analyse complète des positions
                            </p>
                          </div>
                        </div>

                        <motion.pre
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-[12px] leading-relaxed text-slate-700 dark:bg-zinc-800/50 dark:text-zinc-300"
                        >
                          {derived.aspectsTexte || "Aucun aspect disponible"}
                        </motion.pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {tab === "mission" && (
                <motion.div
                  key="mission"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl dark:from-zinc-900 dark:to-zinc-800"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-3">
                      <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        {derived.missionTitre}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-zinc-400">
                        Analyse complète de la mission de vie
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-sm max-w-none dark:prose-invert"
                  >
                    <div className="space-y-4 text-[14px] leading-relaxed text-slate-700 dark:text-zinc-300">
                      {derived.missionContenu.split('\n\n').map((paragraph: string, idx: number) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="leading-relaxed"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-zinc-700">
                    <span className="text-[12px] text-slate-500 dark:text-zinc-400">
                      Généré le {derived.dateGen}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-xl bg-gradient-to-r from-slate-900 to-black px-4 py-2 text-[12px] font-bold text-white dark:from-zinc-800 dark:to-zinc-900"
                    >
                      Voir l'analyse complète
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Effet de bordure animé */}
        <motion.div
          className="absolute -inset-px rounded-4xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500 opacity-50"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* Contre-bordure pour l'effet de profondeur */}
        <div className="absolute -inset-px rounded-4xl bg-gradient-to-br from-white/30 to-transparent" />
      </motion.article>
    );
  },
  (prev, next) => {
    // Comparator ultra-optimisé basé sur les données backend
    const p: any = prev.consultation;
    const n: any = next.consultation;

    // Vérification rapide d'identité
    if (p === n && prev.notifiedback === next.notifiedback) return true;

    // Comparaison des champs critiques uniquement
    const sameId = String(p?._id ?? "") === String(n?._id ?? "");
    const sameNotified = Boolean(p?.analysisNotified) === Boolean(n?.analysisNotified);
    const sameNotificationStatus = prev.notifiedback === next.notifiedback;

    // Comparaison des métadonnées du sujet (critique pour l'affichage)
    const ps = p?.carteDuCiel?.sujet;
    const ns = n?.carteDuCiel?.sujet;
    const sameSujet =
      String(ps?.prenoms ?? "") === String(ns?.prenoms ?? "") &&
      String(ps?.nom ?? "") === String(ns?.nom ?? "");

    // Comparaison de la date de génération (pour le cache)
    const sameGenerationDate =
      String(p?.dateGeneration ?? "") === String(n?.dateGeneration ?? "");

    // Même gestionnaires
    const sameHandlers =
      prev.onModifyAnalysis === next.onModifyAnalysis &&
      prev.onNotifyUser === next.onNotifyUser;

    return sameId && sameNotified && sameNotificationStatus && sameSujet &&
      sameGenerationDate && sameHandlers;
  }
);

DisplayConsultationCard.displayName = "DisplayConsultationCard";

export default DisplayConsultationCard;