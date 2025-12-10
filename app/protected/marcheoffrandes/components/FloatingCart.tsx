import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartProps {
    count: number;
    onClick: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({ count, onClick }) => (
    <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white z-40 active:scale-90 transition-transform"
    >
        <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-black border-2 border-white">
            {count > 99 ? '99+' : count}
        </span>
    </motion.button>
);
