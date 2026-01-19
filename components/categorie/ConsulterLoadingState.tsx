import { memo } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ConsulterLoadingState = memo(function ConsulterLoadingState() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="relative"
            >
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600 dark:text-purple-400" />
                <div className="absolute inset-0 blur-xl bg-purple-500/20 dark:bg-purple-400/20 rounded-full animate-pulse" />
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-2"
            >
                <p className="text-base sm:text-lg font-medium bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Chargement de votre consultation
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Veuillez patienter quelques instants...
                </p>
            </motion.div>
        </motion.div>
    );
});

export default ConsulterLoadingState;
