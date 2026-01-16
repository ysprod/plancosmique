'use client';
import React from 'react';
import { Consultation } from '@/lib/interfaces';
import dynamic from 'next/dynamic';

const NumerologyConsultationCardClient = dynamic(() => import('@/components/consultations/NumerologyConsultationCardClient'), { ssr: false });

interface NumerologieContentProps {
  consultation: Consultation;
}

const NumerologieContent: React.FC<NumerologieContentProps> = ({ consultation }) => (
  <>
    <NumerologyConsultationCardClient consultation={consultation} />
  </>
);

export default NumerologieContent;
