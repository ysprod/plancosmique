import React from 'react';
import { motion } from 'framer-motion';
import AnalyseGenere from './AnalyseGenere';

const Slide4SectionGenereAnalyse: React.FC = () => (
  <motion.div key="genereanalyse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
    <AnalyseGenere />
  </motion.div>
);

export default Slide4SectionGenereAnalyse;
