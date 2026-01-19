'use client';
import type { CategorieAdmin } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useMemo } from "react";
import CategoryBackButton from "./CategoryBackButton";
import CategoryDescription from "./CategoryDescription";
import CategoryTitle from "./CategoryTitle";
import { useCategoryHeader } from "@/hooks/commons/useCategoryHeader";

interface CategoryHeaderProps {
  category: CategorieAdmin;
  rubriqueCourante: any;
  closeRubrique: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: -10, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 30
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { type: "spring", stiffness: 500, damping: 18 }
  },
  tap: { scale: 0.94 }
};

const CategoryHeader: React.FC<CategoryHeaderProps> = memo(({
  category, rubriqueCourante, closeRubrique
}) => {
  const { hasDescription, description, categoryName } = useCategoryHeader(category);

  // Memoize class names to prevent string concatenation on every render
  const containerClasses = useMemo(
    () => "relative isolate py-6 sm:py-8 px-4 flex flex-col items-center justify-center text-center overflow-hidden",
    []
  );

  const contentClasses = useMemo(
    () => "relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-3 sm:gap-4",
    []
  );

  return (
    <motion.header
      className={containerClasses}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-16 sm:-bottom-32 sm:-left-24 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-gradient-to-tr from-pink-500/20 via-rose-500/15 to-transparent dark:from-pink-400/15 dark:via-rose-400/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Content */}
      <div className={contentClasses}>
        <motion.div
          variants={itemVariants}
          className="w-full space-y-2 sm:space-y-3"
        >
          <CategoryTitle title={categoryName} />
          <AnimatePresence mode="wait">
            {hasDescription && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <CategoryDescription description={description} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Back button */}
        <AnimatePresence mode="wait">
          {rubriqueCourante && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-2"
            >
              <CategoryBackButton onClick={closeRubrique} variants={buttonVariants} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}, (prev, next) =>
  prev.category._id === next.category._id &&
  prev.rubriqueCourante?._id === next.rubriqueCourante?._id
);

CategoryHeader.displayName = "CategoryHeader";

export default CategoryHeader;