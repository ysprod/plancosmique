import { memo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

const CosmicCenterIcon = memo(() => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center"
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 360],
    }}
    transition={{
      scale: { duration: 2, repeat: Infinity },
      rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
    }}
  >
    <div className="relative">
      <Shield className="w-14 h-14 text-purple-600" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Sparkles className="w-7 h-7 text-pink-500" />
      </motion.div>
    </div>
  </motion.div>
));

CosmicCenterIcon.displayName = 'CosmicCenterIcon';

export default CosmicCenterIcon;