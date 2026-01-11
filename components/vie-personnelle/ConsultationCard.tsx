import { ConsultationChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
 
const ConsultationCard: React.FC<{
  choice: ConsultationChoice;
  onSelect: () => void;
  alreadyDone: boolean;
  consultationId?: string;
}> = ({ choice, onSelect, alreadyDone, consultationId }) => {
  const router = useRouter();
  //   console.log('choice:', choice );

  // console.log('ConsultationCard rendered for choice:', choice._id, 'alreadyDone:', alreadyDone, 'consultationId:', consultationId);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 bg-white shadow-lg rounded-2xl cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-all"
    >
      <h2 className="font-bold text-purple-700 text-lg mb-3">{choice.title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{choice.description}</p>
      {alreadyDone  ? (
        <a
          href={`/secured/consultation/${consultationId}`}
          className="w-full block px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:scale-105 hover:shadow-lg text-center transition-all"
        >
          Voir l'analyse
        </a>
      ) : (
        <button
          onClick={onSelect}
          className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:scale-105 hover:shadow-lg transition-all"
        >
          Consulter
        </button>
      )}
    </motion.div>
  );
};

export default ConsultationCard;
