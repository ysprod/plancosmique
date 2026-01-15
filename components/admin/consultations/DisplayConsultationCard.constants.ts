export const cardVariants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24, mass: 0.75 },
  },
  exit: { opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.12 } },
};
