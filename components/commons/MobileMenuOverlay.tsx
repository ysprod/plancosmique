import { motion } from 'framer-motion';

export default function MobileMenuOverlay({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
    />
  );
}
