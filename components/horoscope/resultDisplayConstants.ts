import { Variants } from 'framer-motion';
import { Heart, Briefcase, Activity } from 'lucide-react';

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

export const headerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
};

export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const SECTION_ICONS = {
  love: Heart,
  work: Briefcase,
  health: Activity
} as const;

export const SECTION_COLORS = {
  love: {
    icon: 'text-rose-600',
    bg: 'bg-rose-100',
    hover: 'hover:border-rose-300',
    gradient: 'from-rose-50 to-pink-50'
  },
  work: {
    icon: 'text-blue-600',
    bg: 'bg-blue-100',
    hover: 'hover:border-blue-300',
    gradient: 'from-blue-50 to-indigo-50'
  },
  health: {
    icon: 'text-green-600',
    bg: 'bg-green-100',
    hover: 'hover:border-green-300',
    gradient: 'from-green-50 to-emerald-50'
  }
} as const;
