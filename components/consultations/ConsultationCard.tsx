"use client";
import { cx } from '@/lib/functions';
import type { Consultation } from '@/lib/interfaces';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Download, Eye, MapPin, Rocket, Shield, Sparkles, User, Share2 } from 'lucide-react';
import React, { memo, useCallback } from 'react';
import TypeIndicator from './TypeIndicator';
import useConsultationData from '../../hooks/commons/useConsultationData';


function normalizeType(v: any) {
  return String(v ?? "").trim().toLowerCase().replace(/_/g, "-");
}

function isNumerologyType(t: any) {
  const x = normalizeType(t);
  return x === "nombres-personnels" || x === "cycles-personnels" || x === "numerologie";
}


export interface ConsultationCardProps {
  consultation: Consultation;
  index: number;
  onView: (id: string) => void;
  onDownload: (id: string) => void;
}

const ConsultationCard: React.FC<ConsultationCardProps> = memo(({ 
  consultation, 
  index, 
  onView, 
  onDownload 
}) => {
  const reduceMotion = useReducedMotion();
  const derived = useConsultationData(consultation);
    const numerology = isNumerologyType(consultation?.type);
  // Handlers mémoisés
  const handleView = useCallback(() => {
    onView(consultation._id);
  }, [consultation._id, onView]);

  const handleDownload = useCallback(() => {
    onDownload(consultation._id);
  }, [consultation._id, onDownload]);

  // Handler de partage réseaux sociaux
  const handleShare = useCallback(() => {
    const url = window.location.origin + '/secured/consultations/' + consultation._id;
    const shareData = {
      title: consultation.title,
      text: 'Découvrez mon analyse sur Mon Étoile !',
      url,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert('Lien copié dans le presse-papier !');
    }
  }, [consultation._id, consultation.title]);

  // Variants d'animation
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95,
      filter: "blur(10px)" 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 25,
        mass: 0.8,
        delay: index * 0.05 // Réduit pour plus de fluidité
      }
    },
    hover: reduceMotion ? {} : {
      y: -6,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    tap: { scale: 0.98 }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      layoutId={`consultation-${consultation._id}`}
      className={cx(
        "group relative isolate overflow-hidden rounded-3xl p-5",
        "bg-gradient-to-br from-white/95 via-white/90 to-white/95",
        "shadow-2xl shadow-black/5 backdrop-blur-xl",
        "border border-white/40 dark:border-zinc-800/40",
        "dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-900/95",
        "dark:shadow-black/30"
      )}
      aria-label={`Consultation de ${derived.fullName}`}
    >
      {/* Effets de fond cosmiques */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-violet-500/8 to-fuchsia-500/4 blur-3xl"
          animate={{ 
            x: [0, 15, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-emerald-500/8 to-cyan-500/4 blur-3xl"
          animate={{ 
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        
        {/* Effet de lumière mobile */}
        {!reduceMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent"
            animate={{
              x: ["-100%", "200%", "-100%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: "50%",
              height: "100%",
            }}
          />
        )}
      </div>

      {/* Bordure animée */}
      <motion.div
        className="absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500 opacity-30"
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
      <div className="flex flex-col items-center gap-2 mb-2">
        <TypeIndicator type={consultation.type} />
      </div>
        {/* Informations personnelles */}
        <div className="mb-4 rounded-2xl bg-gradient-to-br from-slate-50/80 to-white/80 p-4 backdrop-blur-sm dark:from-zinc-800/50 dark:to-zinc-900/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 p-2">
              <User className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {derived.fullName || '—'}
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">
                Sujet de l'analyse
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-1.5">
                  <Calendar className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  {derived.birthDate}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-1.5">
                  <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  {derived.birthTime}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-1.5">
                  <MapPin className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 truncate">
                  {derived.birthLocation || '—'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-r from-rose-500/10 to-pink-500/10 p-1.5">
                  <Calendar className="h-3 w-3 text-rose-600 dark:text-rose-400" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  Créé {derived.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      {/* Contre-bordure pour effet de profondeur */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
      <div className="relative z-10">
       
        {/* Header avec badges */}
        <div className="flex items-start justify-between gap-4 mb-4">

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative flex-shrink-0"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
                <Sparkles className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <motion.div
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm"
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
                  {index + 1}
                </span>
              </motion.div>
            </motion.div>
            
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                {consultation.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600/90 dark:text-zinc-300/90">
                {consultation.description}
              </p>
            </div>
          </div>         
          
        </div>


        {/* Métadonnées */}
        {derived.completedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-between rounded-2xl bg-gradient-to-br from-emerald-50/80 to-green-50/80 p-3 backdrop-blur-sm dark:from-emerald-900/20 dark:to-green-900/20"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                  Analyse complétée
                </div>
                <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">
                  Le {derived.completedDate}
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="text-2xl"
            >
              🎯
            </motion.div>
          </motion.div>
        )}

        {/* Actions */}
        {derived.hasResult ? (
          <div className="flex gap-3">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleView}
              type="button"
              className="group relative flex-1 flex items-center justify-center gap-3 rounded-2xl px-4 py-3"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-900 to-black shadow-lg group-hover:from-violet-900 group-hover:to-indigo-900 transition-all" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Eye className="relative h-4 w-4 text-white" />
              <span className="relative text-sm font-extrabold text-white">
                Voir l'analyse
              </span>
            </motion.button>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleDownload}
              type="button"
              className="group relative flex items-center justify-center gap-3 rounded-2xl px-4 py-3"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg group-hover:from-purple-700 group-hover:to-pink-700 transition-all" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Download className="relative h-4 w-4 text-white" />
              <span className="relative text-sm font-extrabold text-white">
                PDF
              </span>
            </motion.button>            
          </div>
        ) : (
          <div className="space-y-3">
            {derived.isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-4 border border-amber-500/30"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-2"
                  >
                    <Rocket className="h-4 w-4 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-amber-800 dark:text-amber-200">
                      Génération en cours
                    </div>
                    <div className="text-xs text-amber-600/80 dark:text-amber-400/80">
                      Votre analyse est en préparation. Revenez dans quelques instants.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {derived.isFailed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl bg-gradient-to-r from-red-500/20 to-rose-500/20 p-4 border border-red-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 p-2">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-red-800 dark:text-red-200">
                      Une erreur est survenue
                    </div>
                    <div className="text-xs text-red-600/80 dark:text-red-400/80">
                      Contactez le support pour résoudre ce problème.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleView}
              type="button"
              className="group relative w-full flex items-center justify-center gap-3 rounded-2xl px-4 py-3"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-900/80 to-black/80 shadow-lg group-hover:from-slate-800 group-hover:to-black transition-all" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Eye className="relative h-4 w-4 text-white" />
              <span className="relative text-sm font-extrabold text-white">
                {derived.isProcessing ? 'Suivre la progression' : 'Voir les détails'}
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.article>
  );
}, (prev, next) => {
  // Comparator ultra-optimisé
  if (prev.consultation === next.consultation && 
      prev.index === next.index && 
      prev.onView === next.onView && 
      prev.onDownload === next.onDownload) {
    return true;
  }
  
  // Vérification fine des changements critiques
  const p = prev.consultation;
  const n = next.consultation;
  
  const sameId = p._id === n._id;
  const sameStatus = p.status === n.status;
  const sameResultData = p.resultData === n.resultData;
  const sameTitle = p.title === n.title;
  const sameDescription = p.description === n.description;
  const sameCompletedDate = p.completedDate === n.completedDate;
  
  // Comparaison des données du formulaire
  const pForm = p.formData;
  const nForm = n.formData;
  const sameFormData = (
    pForm?.prenoms === nForm?.prenoms &&
    pForm?.nom === nForm?.nom &&
    pForm?.dateNaissance === nForm?.dateNaissance &&
    pForm?.heureNaissance === nForm?.heureNaissance
  );
  
  return sameId && sameStatus && sameResultData && sameTitle && 
         sameDescription && sameCompletedDate && sameFormData;
});

ConsultationCard.displayName = 'ConsultationCard';

export default ConsultationCard;