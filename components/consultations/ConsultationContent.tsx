import MarkdownContent from '@/components/consultations/MarkdownContent';
import SubjectHeader from '@/components/consultations/SubjectHeader';
import { AnalyseAstrologique } from '@/lib/interfaces';
import { motion } from 'framer-motion';

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 25,
      duration: 0.4
    }
  }
};

interface ConsultationContentProps {
  analyse: AnalyseAstrologique;
}

export default function ConsultationContent({analyse }: ConsultationContentProps) {
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
      <SubjectHeader sujet={analyse.carteDuCiel.sujet} />
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/20"
      >
        <MarkdownContent content={analyse.missionDeVie.contenu} />
      </motion.div>
    </div>
  );
}
