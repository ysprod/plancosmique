'use client';
import { motion } from 'framer-motion';
import AnimatedStar from '@/components/notfound/AnimatedStar';
import BackgroundOrbs from '@/components/notfound/BackgroundOrbs';
import { useStars } from '@/hooks/commons/useStars';

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

export default function NotFoundBackground() {
  const stars = useStars();
  return (
    <motion.div
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 -z-10"
    >
      <BackgroundOrbs />
      {stars.map((star) => (
        <AnimatedStar key={star.index} {...star} />
      ))}
    </motion.div>
  );
}