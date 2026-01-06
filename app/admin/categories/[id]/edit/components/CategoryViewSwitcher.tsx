import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PreviewCard from "./PreviewCard";
import SuccessCard from "./SuccessCard";
import CategoryForm from "./CategoryForm";

interface CategoryViewSwitcherProps {
  view: string;
  pageLoading: boolean;
  formProps: any;
  previewProps: any;
  successProps: any;
}

const CategoryViewSwitcher: React.FC<CategoryViewSwitcherProps> = ({
  view, pageLoading, formProps, previewProps, successProps
}) => {
  if (pageLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
        <div className="mt-3 h-24 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
        <div className="mt-3 h-56 w-full animate-pulse rounded-3xl bg-slate-200 dark:bg-zinc-800" />
      </div>
    );
  }
  return (
    <AnimatePresence mode="wait" initial={false}>
      {view === "edit" && (
        <motion.div key="edit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <CategoryForm {...formProps} />
        </motion.div>
      )}
      {view === "preview" && (
        <PreviewCard {...previewProps} />
      )}
      {view === "success" && (
        <SuccessCard {...successProps} />
      )}
    </AnimatePresence>
  );
};

export default CategoryViewSwitcher;