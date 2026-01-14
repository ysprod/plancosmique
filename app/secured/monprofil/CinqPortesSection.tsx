'use client';
import CinqPortesNotAvailableSection from '@/components/carteduciel/CinqPortesNotAvailableSection';
import CinqPortesHeader from '@/components/cinqportes/CinqPortesHeader';
import CinqPortesGrid from '@/components/cinqportes/CinqPortesGrid';
import CinqPortesFooter from '@/components/cinqportes/CinqPortesFooter';
import { useCinqPortesData } from '@/hooks/cinqportes/useCinqPortesData';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { CarteDuCielData } from '@/lib/interfaces';

interface CinqPortesSectionProps {
  carteDuCiel: CarteDuCielData | null;
  isPremium: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const CinqPortesSection = memo<CinqPortesSectionProps>(({ carteDuCiel, isPremium }) => {
  const { cinqPortes, portesArray } = useCinqPortesData(carteDuCiel);

  if (!cinqPortes) { return <CinqPortesNotAvailableSection />; }

  return (
    <section className="w-full py-8 px-4 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto flex flex-col items-center justify-center"
      >
        <CinqPortesHeader isPremium={isPremium} />

        <CinqPortesGrid portesArray={portesArray} isPremium={isPremium} />
        <CinqPortesFooter />
      </motion.div>
    </section>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.carteDuCiel === nextProps.carteDuCiel &&
    prevProps.isPremium === nextProps.isPremium
  );
});

CinqPortesSection.displayName = 'CinqPortesSection';

export default CinqPortesSection;