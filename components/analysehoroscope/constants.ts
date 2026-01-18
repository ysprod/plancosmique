import { Variants } from "framer-motion";

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
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 22
        }
    }
};

export const ANIMATION_DURATION = 0.4;

export const RUBRIQUE_ID = '694e393df5e46df83664b4c5';

export const TYPE_CONSULTATION = 'HOROSCOPE';