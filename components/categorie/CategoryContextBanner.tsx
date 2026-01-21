'use client';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { memo, useMemo } from 'react';

interface CategoryContextBannerProps {
  rubriqueTitre?: string;
  choixTitre?: string;
  choixDescription?: string;
}

const CategoryContextBanner = memo<CategoryContextBannerProps>(function CategoryContextBanner({
  rubriqueTitre,
  choixTitre,
  choixDescription
}) {
  const containerClasses = useMemo(
    () => "relative isolate mb-4 sm:mb-6 overflow-hidden rounded-2xl border border-purple-200/50 dark:border-purple-800/30 bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-pink-50/80 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-pink-950/40 backdrop-blur-xl flex flex-col items-center justify-center text-center",
    []
  );

  const contentClasses = useMemo(
    () => "relative z-10 px-4 py-3 sm:px-6 sm:py-4 w-full flex flex-col items-center justify-center text-center",
    []
  );

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 dark:from-purple-400/5 dark:via-indigo-400/5 dark:to-pink-400/5"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '200% 200%' }}
      />

      <div className={contentClasses}>
        {/* Rubrique info */}
        {rubriqueTitre && (
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-purple-900/70 dark:text-purple-100/70">
              Rubrique :
            </span>
            <span className="text-xs sm:text-sm font-semibold text-purple-950 dark:text-purple-50 truncate max-w-xs">
              {rubriqueTitre}
            </span>
          </motion.div>
        )}

        {/* Choice info */}
        {choixTitre && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-indigo-900/70 dark:text-indigo-100/70">
                Consultation :
              </span>
              <span className="text-xs sm:text-sm font-semibold text-indigo-950 dark:text-indigo-50 truncate max-w-xs">
                {choixTitre}
              </span>
            </div>
            {choixDescription && (
              <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed mt-1 max-w-md mx-auto">
                {choixDescription}
              </p>
            )}
          </motion.div>
        )}

        {/* Decorative shine effect */}
        <motion.div
          className="pointer-events-none absolute -top-1 -right-1 h-20 w-20 rounded-full bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}, (prev, next) => 
  prev.rubriqueTitre === next.rubriqueTitre &&
  prev.choixTitre === next.choixTitre &&
  prev.choixDescription === next.choixDescription
);

CategoryContextBanner.displayName = "CategoryContextBanner";

export default CategoryContextBanner;
