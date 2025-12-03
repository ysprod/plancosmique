import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SuccessMessage: React.FC<{ message: string }> = ({ message }) => (
  <motion.p
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-green-600 text-sm mt-2 flex items-center gap-1 bg-green-50 p-3 rounded-lg"
  >
    <Check className="w-5 h-5" />
    {message}
  </motion.p>
);

export default SuccessMessage;
