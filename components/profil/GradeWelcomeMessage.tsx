'use client';

import { motion } from 'framer-motion';
import { Grade, GRADE_MESSAGES } from '@/lib/types/grade.types';

interface GradeWelcomeMessageProps {
  userName: string;
  grade: Grade | null;
  isNewGrade?: boolean;
}

export default function GradeWelcomeMessage({ userName, grade, isNewGrade = false }: GradeWelcomeMessageProps) {
  if (!grade) return null;
  
  const messages = GRADE_MESSAGES[grade];
  const message = isNewGrade ? messages.congratulations : messages.welcome;

  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl"
    >
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-purple to-cosmic-indigo mb-4">
          {isNewGrade ? 'Félicitations' : 'Bienvenue'}, {userName} !
        </h2>
        
        <div className="text-slate-200 leading-relaxed whitespace-pre-line">
          {message}
        </div>

        {grade === Grade.ASPIRANT && !isNewGrade && (
          <div className="mt-6 space-y-2 text-sm text-slate-300">
            <p className="font-semibold text-cosmic-purple">Ces 9 grades sont :</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li><strong>Aspirant</strong> – le premier pas vers la connaissance de soi.</li>
              <li><strong>Contemplateur</strong> – celui qui observe, perçoit et s'ouvre à la sagesse.</li>
              <li><strong>Conscient</strong> – celui qui commence à intégrer la compréhension et la vigilance intérieure.</li>
              <li><strong>Intégrateur</strong> – celui qui harmonise ses expériences et commence à structurer son être.</li>
              <li><strong>Transmutant</strong> – celui qui transforme ses énergies et dépasse ses limites.</li>
              <li><strong>Aligné</strong> – celui dont les actions, la pensée et l'âme sont en cohérence.</li>
              <li><strong>Éveillé</strong> – celui qui a développé une perception profonde de lui-même et de l'univers.</li>
              <li><strong>Sage</strong> – celui qui détient la connaissance éclairée et sait la transmettre.</li>
              <li><strong>Maître de Soi</strong> – celui qui a atteint l'harmonie totale entre ciel, terre et conscience.</li>
            </ol>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-700 text-sm text-slate-400 italic text-center">
          Que votre étoile vous éclaire sur ce chemin où le ciel et la terre se répondent,<br />
          et où la connaissance de soi devient un acte sacré.
        </div>
      </div>
    </motion.div>
  );
}
