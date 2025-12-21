import { motion } from 'framer-motion';

export interface ConsultationChoice {
  id: string;
  title: string;
  description: string;
}

const ConsultationCard: React.FC<{
  choice: ConsultationChoice;
  onSelect: () => void;
}> = ({ choice, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-6 bg-white shadow-lg rounded-2xl cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-all"
  >
    <h2 className="font-bold text-purple-700 text-lg mb-3">{choice.title}</h2>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">{choice.description}</p>
    <button
      onClick={onSelect}
      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
    >
      Consulter
    </button>
  </motion.div>
);

export default ConsultationCard;
