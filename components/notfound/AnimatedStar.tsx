import { memo } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export interface AnimatedStarProps {
  index: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

const AnimatedStar = memo<AnimatedStarProps>(({ index, top, left, delay, duration }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top: `${top}%`, left: `${left}%` }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut'
    }}
  >
    <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white/60 drop-shadow-glow" />
  </motion.div>
));

AnimatedStar.displayName = 'AnimatedStar';
export default AnimatedStar;
