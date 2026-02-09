'use client';
import React from 'react';
import { Consultation } from '@/lib/interfaces';
import dynamic from 'next/dynamic';
 
interface NumerologieContentProps {
  consultation: Consultation;
}

const NumerologieContent: React.FC<NumerologieContentProps> = ({ consultation }) => (
  <>
    bonjour
  </>
);

export default NumerologieContent;
