'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import PorteCard from '@/components/carteduciel/PorteCard';

interface CinqPortesGridProps {
  portesArray: any[];
  isPremium: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 100 } }
};

const CinqPortesGrid = memo<CinqPortesGridProps>(({ portesArray, isPremium }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6"
    >
    
      {portesArray.map((porte, index) => (
        <motion.div 
          key={porte.label} 
          variants={itemVariants}
          className="flex items-center justify-center"
        >
          <PorteCard
            label={porte.label}
            valeur={porte.valeur}
            description={porte.description}
            icon={porte.icon}
            gradient={porte.gradient}
            index={index}
            isPremium={isPremium}
          />
        </motion.div>
      ))}

    </motion.div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.portesArray.length === nextProps.portesArray.length &&
    prevProps.isPremium === nextProps.isPremium
  );
});

CinqPortesGrid.displayName = 'CinqPortesGrid';

export default CinqPortesGrid;