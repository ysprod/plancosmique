export const ANIMATION_DURATION = 0.25;

export const containerVariants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      duration: ANIMATION_DURATION
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: ANIMATION_DURATION * 0.6,
      ease: 'easeOut'
    }
  }
};

export const processingVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 25,
      mass: 0.9
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: ANIMATION_DURATION * 0.5
    }
  }
};

export const toastVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 22
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

