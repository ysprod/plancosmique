import { motion } from 'framer-motion';

interface ScrollProgressBarProps {
  scrollY: any;
  progressWidth: any;
}

export function ScrollProgressBar({ scrollY, progressWidth }: ScrollProgressBarProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 origin-left"
      style={{ scaleX: scrollY.get() > 0 ? progressWidth : 0 }}
    >
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="h-full w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
    </motion.div>
  );
}
