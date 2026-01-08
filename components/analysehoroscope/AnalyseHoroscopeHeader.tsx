import PageHeader from '@/components/analysehoroscope/PageHeader';
import { motion } from 'framer-motion';
import { containerVariants } from '@/lib/animation.constants';

const AnalyseHoroscopeHeader = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="max-w-7xl mx-auto"
  >
    <PageHeader />
  </motion.div>
);

export { AnalyseHoroscopeHeader };
