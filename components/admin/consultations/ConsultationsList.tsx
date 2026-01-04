import { AnimatePresence } from 'framer-motion';
import StatusBadge from './StatusBadge';
import ConsultationCard from './ConsultationCard';
import PaginationControls from './PaginationControls';
import React from 'react';

interface ConsultationsListProps {
  consultations: any[];
  generatingIds: Set<string>;
  notifyingIds: Set<string>;
  onGenerateAnalysis: (id: string) => void;
  currentPage: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export const ConsultationsList: React.FC<ConsultationsListProps> = ({
  consultations,
  generatingIds,
  notifyingIds,
  loading,
  currentPage,
  totalPages,
  total,
  onPageChange, onGenerateAnalysis, 
}) => {
  return (
    <>
      <AnimatePresence mode="popLayout">
        {consultations.map((consultation: any) => (
          <div key={consultation.id} className="relative">
            <div className="absolute top-2 right-2 z-10">
              <StatusBadge status={consultation.status} />
            </div>
            <ConsultationCard
              consultation={consultation}
              onGenerateAnalysis={onGenerateAnalysis}
              isGenerating={generatingIds.has(consultation.id)}
              isNotifying={notifyingIds.has(consultation.id)}
            />
          </div>
        ))}
      </AnimatePresence>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        itemsPerPage={5}
        onPageChange={onPageChange}
        loading={loading}
      />
    </>
  );
};
