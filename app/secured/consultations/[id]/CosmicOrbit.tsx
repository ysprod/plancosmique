import { motion } from 'framer-motion';
import { memo } from 'react';

interface CosmicOrbitProps {
  radius: number;
  duration: number;
  Icon: React.ElementType;
  delay?: number;
}

const CosmicOrbit = memo<CosmicOrbitProps>(({ radius, duration, Icon, delay = 0 }) => (
  <motion.div
    className="absolute inset-0"
    animate={{ rotate: 360 }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'linear',
      delay
    }}
  >
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `translate(-50%, -50%) translateY(-${radius}px)`
      }}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
    </div>
  </motion.div>
));

CosmicOrbit.displayName = 'CosmicOrbit';
export default CosmicOrbit;
