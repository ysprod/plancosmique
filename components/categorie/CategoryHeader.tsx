import type { CategorieAdmin } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import React, { memo } from "react";
import CategoryBackButton from "./CategoryBackButton";
import CategoryDescription from "./CategoryDescription";
import CategoryTitle from "./CategoryTitle";
import { useCategoryHeader } from "./useCategoryHeader";

interface CategoryHeaderProps {
  category: CategorieAdmin;
  rubriqueCourante: any;
  closeRubrique: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = memo(({
  category, rubriqueCourante, closeRubrique
}) => {
  const { hasDescription, description, categoryName } = useCategoryHeader(category);

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
      className="mb-4 relative overflow-hidden flex flex-col items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/10 to-red-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-500/10 to-red-500/5 blur-3xl" />
      {!rubriqueCourante && (
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <motion.div
            className="flex flex-col items-center justify-center gap-2 w-full"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center justify-center gap-3 w-full">
              <div className="min-w-0 flex-1 flex flex-col items-center justify-center">
                <CategoryTitle title={categoryName} />
                <AnimatePresence>
                  {hasDescription && <CategoryDescription description={description} />}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {rubriqueCourante && (
          <CategoryBackButton onClick={closeRubrique} variants={buttonVariants} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}, (prev, next) => {
  return (
    prev.category === next.category &&
    prev.rubriqueCourante === next.rubriqueCourante &&
    prev.closeRubrique === next.closeRubrique
  );
});

CategoryHeader.displayName = "CategoryHeader";

export default CategoryHeader;