"use client";
import ConsultationsEmpty from "@/components/consultations/ConsultationsEmpty";
import { useConsultationsCount, useConsultationsGridHandlers } from "@/hooks/consultations/useConsultationsGrid";
import useConsultationsListPage from "@/hooks/consultations/useConsultationsListPage";
import { cx } from "@/lib/functions";
import { memo } from "react";
import ConsultationsGrid from "./ConsultationsGrid";
import ConsultationsHeaderSection from "./ConsultationsHeaderSection";
import ConsultationsListLoading from "./ConsultationsListLoading";

const ConsultationsListMain = memo(function ConsultationsListMain() {
  const {
    consultations, loading, searchQuery, error,
    setTypeFilter, setSearchQuery, setStatusFilter, handleView, handleDownload,
  } = useConsultationsListPage();

  const count = useConsultationsCount(consultations);
  const { onView, onDownload } = useConsultationsGridHandlers(handleView, handleDownload);

  if (loading) { return (<ConsultationsListLoading />); }

  return (
    <main
      className={cx(
        "flex flex-col items-center justify-center w-full min-h-[90vh] px-1 sm:px-2 py-2 sm:py-4",
        "max-w-full"
      )}
    >
      <section className="w-full max-w-md sm:max-w-2xl mx-auto">
        <ConsultationsHeaderSection
          count={count}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          error={error}
        />
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
      </ section>

      <section className="w-full max-w-md sm:max-w-2xl mx-auto mt-2 flex flex-col items-center justify-center">
        {count === 0 ? (
          <div key="empty" className="w-full">
            <ConsultationsEmpty
              consultationsLength={count}
              setSearchQuery={setSearchQuery}
              setTypeFilter={setTypeFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
        ) : (
          <div key="list" className="w-full">
            <ConsultationsGrid consultations={consultations} onView={onView} onDownload={onDownload} />
          </div>
        )}
      </section>
      <div className="h-6 sm:h-10" />
    </main>
  );
});

export default ConsultationsListMain;