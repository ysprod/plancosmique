"use client";
import ConsultationsEmpty from "@/components/consultations/ConsultationsEmpty";
import { useConsultationsCount, useConsultationsGridHandlers } from "@/hooks/consultations/useConsultationsGrid";
import useConsultationsListPage from "@/hooks/consultations/useConsultationsListPage";
import { cx } from "@/lib/functions";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import ConsultationsGrid from "./ConsultationsGrid";
import ConsultationsHeaderSection from "./ConsultationsHeaderSection";
import ConsultationsListLoading from "./ConsultationsListLoading";

const shellVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease: "easeOut" } },
};

const ConsultationsListMain = memo(function ConsultationsListMain() {
  const reduceMotion = useReducedMotion();
  const {
    consultations, loading, searchQuery, error,
    setTypeFilter, setSearchQuery, setStatusFilter, handleView, handleDownload,
  } = useConsultationsListPage();

  const count = useConsultationsCount(consultations);
  const { onView, onDownload } = useConsultationsGridHandlers(handleView, handleDownload);

  if (loading) {
    return (<ConsultationsListLoading />);
  }

  return (
    <motion.main
      variants={shellVariants}
      initial="initial"
      animate="animate"
      className={cx(
        "flex flex-col items-center justify-center w-full min-h-[90vh] px-1 sm:px-2 py-2 sm:py-4",
        "max-w-full"
      )}
    >
      <motion.section
        className="w-full max-w-md sm:max-w-2xl mx-auto"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <ConsultationsHeaderSection
          count={count}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          error={error}
        />
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl"
            animate={{ opacity: [0.45, 0.9, 0.45] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.section>

      <section className="w-full max-w-md sm:max-w-2xl mx-auto mt-2 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {count === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.14 } }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.12 } }}
              className="w-full"
            >
              <ConsultationsEmpty
                consultationsLength={count}
                setSearchQuery={setSearchQuery}
                setTypeFilter={setTypeFilter}
                setStatusFilter={setStatusFilter}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.14 } }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.12 } }}
              className="w-full"
            >
              <ConsultationsGrid consultations={consultations} onView={onView} onDownload={onDownload} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-6 sm:h-10" />
    </motion.main>
  );
});

export default ConsultationsListMain;