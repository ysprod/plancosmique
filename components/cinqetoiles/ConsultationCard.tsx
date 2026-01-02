import { ConsultationChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';

const ConsultationCard: React.FC<{
  choice: ConsultationChoice;
}> = ({ choice }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-6 bg-white shadow-lg rounded-2xl cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-all"
  >
    <h2 className="font-bold text-purple-700 text-lg mb-3">{choice.title}</h2>
   
    <p className="text-gray-600 text-sm leading-relaxed mb-4">{choice.description}</p>
  </motion.div>
);

export default ConsultationCard;