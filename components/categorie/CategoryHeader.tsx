import React, { memo } from "react";
import { Layers, ArrowLeft, Sparkles, ChevronLeft, FolderOpen } from "lucide-react";
import type { Categorie } from "@/hooks/categories/useAdminCategoriesPage";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryHeaderProps {
  category: Categorie;
  rubriqueCount: number;
  rubriqueCourante: any;
  closeRubrique: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = memo(({ 
  category, 
  rubriqueCount, 
  rubriqueCourante, 
  closeRubrique 
}) => {
  // Dérivés calculés une fois
  const hasDescription = Boolean(category.description?.trim());
  const description = category.description?.trim() || "";
  const categoryName = category.nom?.trim() || "Catégorie sans nom";
  
  // Constantes pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0, filter: "blur(4px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05, 
      rotate: -2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="mb-4 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Effets de fond décoratifs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-500/10 to-cyan-500/5 blur-3xl" />
      
      {/* Ligne d'accent colorée */}
      <motion.div 
        className="h-[3px] w-24 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 mb-4"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      
      <div className="flex flex-col gap-3">
        {/* En-tête principal avec bouton conditionnel */}
        <motion.div 
          className="flex items-start justify-between gap-4"
          variants={itemVariants}
        >
          {/* Section titre avec icône */}
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <motion.div
              className="relative mt-0.5"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10">
                <FolderOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <motion.div
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-sm"
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
                <span className="text-[9px] font-black text-white">
                  {rubriqueCount}
                </span>
              </motion.div>
            </motion.div>
            
            <div className="min-w-0 flex-1">
              <motion.h1 
                className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl"
                initial={{ filter: "blur(10px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={{ duration: 0.4 }}
              >
                {categoryName}
              </motion.h1>
              
              <AnimatePresence>
                {hasDescription && (
                  <motion.p 
                    className="mt-2 text-sm leading-relaxed text-slate-600/90 dark:text-zinc-300/90"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bouton conditionnel */}
          <AnimatePresence mode="wait">
            {rubriqueCourante ? (
              <motion.button
                key="back-button"
                type="button"
                onClick={closeRubrique}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="group relative inline-flex items-center gap-2 rounded-2xl px-4 py-3"
                aria-label="Retour à la liste des rubriques"
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Fond avec dégradé */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-100 to-white border border-slate-200/80 group-hover:from-violet-50 group-hover:to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 dark:border-zinc-700/80 dark:group-hover:from-violet-900/20 dark:group-hover:to-indigo-900/20" />
                
                {/* Bordure animée */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl p-[1.5px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ opacity: 0.8 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-30 blur-[1px]" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-60" />
                </motion.div>
                
                {/* Contenu du bouton */}
                <ChevronLeft className="relative h-4 w-4 text-slate-700 group-hover:text-violet-700 dark:text-zinc-300 dark:group-hover:text-violet-300" />
                <span className="relative text-[13px] font-extrabold text-slate-800 group-hover:text-violet-800 dark:text-zinc-200 dark:group-hover:text-violet-200">
                  Retour
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="count-badge"
                variants={itemVariants}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="group relative inline-flex items-center gap-2 rounded-2xl px-4 py-3"
              >
                {/* Fond du badge */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-sm border border-slate-200/60 group-hover:border-violet-200/80 dark:from-zinc-900/80 dark:to-zinc-800/80 dark:border-zinc-700/60 dark:group-hover:border-violet-700/30" />
                
                {/* Élément décoratif animé */}
                <motion.div
                  className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Contenu du badge */}
                <Sparkles className="relative h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span className="relative text-[13px] font-black tracking-tight text-slate-800 dark:text-zinc-200">
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                    {rubriqueCount}
                  </span>
                  <span className="text-slate-500 dark:text-zinc-400 ml-1">
                    rubrique{rubriqueCount !== 1 ? 's' : ''}
                  </span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Indicateur de statut (seulement quand une rubrique est ouverte) */}
        <AnimatePresence>
          {rubriqueCourante && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <motion.div 
                  className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(16, 185, 129, 0)",
                      "0 0 0 4px rgba(16, 185, 129, 0.3)",
                      "0 0 0 0 rgba(16, 185, 129, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">
                  Consultation de la rubrique en cours
                </span>
              </div>
              
              <motion.div 
                className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-zinc-700"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}, (prev, next) => {
  // Optimisation: re-render uniquement si les props changent réellement
  return (
    prev.category === next.category &&
    prev.rubriqueCount === next.rubriqueCount &&
    prev.rubriqueCourante === next.rubriqueCourante &&
    prev.closeRubrique === next.closeRubrique
  );
});

CategoryHeader.displayName = "CategoryHeader";

export default CategoryHeader;