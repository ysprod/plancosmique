'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp, Book, Sparkles } from 'lucide-react';
import { Grade, GRADE_ORDER, getGradeName, getGradeLevel, UserProgress } from '@/lib/types/grade.types';

interface GradeBadgeProps {
  progress: UserProgress;
  showDetails?: boolean;
}

const GRADE_COLORS: Record<Grade, { bg: string; border: string; glow: string }> = {
  [Grade.ASPIRANT]: { bg: 'from-slate-600 to-slate-700', border: 'border-slate-500', glow: 'shadow-slate-500/50' },
  [Grade.CONTEMPLATEUR]: { bg: 'from-blue-600 to-blue-700', border: 'border-blue-500', glow: 'shadow-blue-500/50' },
  [Grade.CONSCIENT]: { bg: 'from-cyan-600 to-cyan-700', border: 'border-cyan-500', glow: 'shadow-cyan-500/50' },
  [Grade.INTEGRATEUR]: { bg: 'from-green-600 to-green-700', border: 'border-green-500', glow: 'shadow-green-500/50' },
  [Grade.TRANSMUTANT]: { bg: 'from-yellow-600 to-yellow-700', border: 'border-yellow-500', glow: 'shadow-yellow-500/50' },
  [Grade.ALIGNE]: { bg: 'from-orange-600 to-orange-700', border: 'border-orange-500', glow: 'shadow-orange-500/50' },
  [Grade.EVEILLE]: { bg: 'from-purple-600 to-purple-700', border: 'border-purple-500', glow: 'shadow-purple-500/50' },
  [Grade.SAGE]: { bg: 'from-pink-600 to-pink-700', border: 'border-pink-500', glow: 'shadow-pink-500/50' },
  [Grade.MAITRE_DE_SOI]: { bg: 'from-amber-600 via-yellow-500 to-amber-600', border: 'border-amber-400', glow: 'shadow-amber-500/70' }
};

export default function GradeBadge({ progress, showDetails = false }: GradeBadgeProps) {
  const gradeName = getGradeName(progress.currentGrade);
  const gradeLevel = getGradeLevel(progress.currentGrade);
  const colors = progress.currentGrade ? GRADE_COLORS[progress.currentGrade] : GRADE_COLORS[Grade.ASPIRANT];

  return (
    <div className="space-y-4">
      {/* Badge principal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border-2 ${colors.border} shadow-lg ${colors.glow}`}
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <Star className="w-12 h-12 text-yellow-300 fill-yellow-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-slate-900">{gradeLevel}</span>
            </div>
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white">{gradeName}</h3>
            <p className="text-white/80 text-sm">Grade initiatique {gradeLevel}/9</p>
          </div>

          {progress.currentGrade === Grade.MAITRE_DE_SOI && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Détails de progression */}
      {showDetails && progress.nextGrade && progress.progressToNextGrade && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cosmic-purple" />
            <h4 className="font-semibold text-white">
              Progression vers {getGradeName(progress.nextGrade)}
            </h4>
          </div>

          <div className="space-y-4">
            {/* Consultations */}
            <ProgressBar
              label="Consultations"
              current={progress.progressToNextGrade.consultations.current}
              required={progress.progressToNextGrade.consultations.required}
              icon="✨"
            />

            {/* Rituels */}
            <ProgressBar
              label="Rituels / Invocations"
              current={progress.progressToNextGrade.rituels.current}
              required={progress.progressToNextGrade.rituels.required}
              icon="🕯️"
            />

            {/* Livres */}
            <ProgressBar
              label="Livres lus"
              current={progress.progressToNextGrade.livres.current}
              required={progress.progressToNextGrade.livres.required}
              icon="📖"
            />
          </div>
        </motion.div>
      )}

      {/* Statistiques actuelles */}
      {showDetails && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4"
        >
          <StatCard
            label="Consultations"
            value={progress.consultationsCompleted}
            icon="✨"
          />
          <StatCard
            label="Rituels"
            value={progress.rituelsCompleted}
            icon="🕯️"
          />
          <StatCard
            label="Livres"
            value={progress.booksRead}
            icon="📖"
          />
        </motion.div>
      )}
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  current: number;
  required: number;
  icon: string;
}

function ProgressBar({ label, current, required, icon }: ProgressBarProps) {
  const percentage = Math.min((current / required) * 100, 100);
  const isComplete = current >= required;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-slate-300 flex items-center gap-2">
          <span>{icon}</span>
          {label}
        </span>
        <span className={`text-sm font-semibold ${isComplete ? 'text-green-400' : 'text-slate-400'}`}>
          {current} / {required}
        </span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-cosmic-purple to-cosmic-indigo'}`}
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </motion.div>
  );
}
