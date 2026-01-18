'use client';
import { Offering } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { OfferingCard } from './OfferingCard';

interface OfferingsGridProps {
  offerings: Offering[];
  selectedCategory: any;
  onAddToCart: (offering: Offering) => void;
}

const OfferingsGrid = ({ offerings, selectedCategory, onAddToCart }: OfferingsGridProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={selectedCategory}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 mb-6 sm:mb-8"
    >
      {offerings.map((offering, index) => (
        <motion.div
          key={offering._id || offering.id}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -20 }}
          transition={{
            duration: 0.3,
            delay: Math.min(index * 0.03, 0.5),
            ease: 'easeOut'
          }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="h-full"
        >
          <OfferingCard offering={offering} onAddToCart={onAddToCart} />
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
);

export default OfferingsGrid;