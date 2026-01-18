'use client';
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { memo } from "react";

const LoadingState = memo(() => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center  bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950"
    >
        <div className="text-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4"
            >
                <Loader2 className="w-full h-full text-purple-400" />
            </motion.div>
            <p className="text-white font-semibold">Chargement du profil...</p>
           
            <p className="text-purple-300 text-sm mt-1">Préparation de votre thème céleste</p>
        </div>
    </motion.div>
));

LoadingState.displayName = 'LoadingState';

export default LoadingState;