'use client';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import ConsultationCard from './ConsultationCard';
import PaginationControls from './PaginationControls';
import { Consultation } from '@/lib/interfaces';

interface ConsultationsListProps {
  consultations: Consultation[];
  generatingIds: Set<string>;
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
  loading,
  currentPage,
  totalPages,
  total,
  onPageChange, onGenerateAnalysis,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {consultations.map((consultation: Consultation) => (
            <div key={consultation.id} className="relative flex justify-center">
              <ConsultationCard
                consultation={consultation}
                onGenerateAnalysis={onGenerateAnalysis}
                isGenerating={generatingIds.has(consultation._id)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        itemsPerPage={10}
        onPageChange={onPageChange}
        loading={loading}
      />
    </>
  );
};