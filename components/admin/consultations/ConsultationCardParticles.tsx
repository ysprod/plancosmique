import { motion } from 'framer-motion';
import { floatingParticle1Variants, floatingParticle2Variants } from './consultationCardVariants';

export default function ConsultationCardParticles() {
  return (
    <>
      <motion.div
        variants={floatingParticle1Variants}
        animate="animate"
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400/30 blur-sm"
      />
      <motion.div
        variants={floatingParticle2Variants}
        animate="animate"
        className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-fuchsia-400/30 blur-sm"
      />
    </>
  );
}
