import { AnimatePresence, motion } from 'framer-motion';
import ConsultationCard from '@/components/cinqetoiles/ConsultationCard';
import LoadingState from '@/components/cinqetoiles/LoadingState';
import SelectionHeader from '@/components/cinqetoiles/SelectionHeader';

export function Slide4SectionSelection({ loading, choices, handleSelect, containerVariants, itemVariants, fadeVariants }: any) {
  return (
    <motion.div
      key="selection"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <SelectionHeader />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          {loading ? (
            <LoadingState />
          ) : (
            choices.map((choice: any) => (
              <motion.div
                key={choice.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4, boxShadow: '0 8px 24px rgba(168, 85, 247, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                <ConsultationCard choice={choice} />
              </motion.div>
            ))
          )}
        </div>
        {!loading && choices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSelect}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
            >
              <span>Consulter Maintenant</span>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
