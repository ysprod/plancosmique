'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AnalyseGenere from './AnalyseGenere';

interface Slide4SectionGenereAnalyseProps {
  consultation?: any;
  choix?: any;
}

const Slide4SectionGenereAnalyse: React.FC<Slide4SectionGenereAnalyseProps> = ({ consultation, choix }) => (
  <AnalyseGenere
    consultation={consultation}
    choix={choix}
  />
);

export default Slide4SectionGenereAnalyse;