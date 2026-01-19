import { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface AnalysisCompleteNoticeProps {
    show: boolean;
}

const AnalysisCompleteNotice = memo<AnalysisCompleteNoticeProps>(function AnalysisCompleteNotice({ show }) {
    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            className="mt-4 sm:mt-6"
        >
            <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green-200/50 dark:border-green-700/30 shadow-lg shadow-green-500/10">
                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-teal-400/10"
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                />

                <div className="relative flex items-center justify-center gap-3 sm:gap-4">
                    {/* Animated check icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="relative"
                    >
                        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
                        <motion.div
                            className="absolute inset-0 blur-xl bg-green-500/30"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>

                    {/* Text content */}
                    <div className="flex-1 text-center sm:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center sm:justify-start gap-2"
                        >
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                            <p className="text-base sm:text-lg font-bold text-green-700 dark:text-green-300">
                                Analyse terminée !
                            </p>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1"
                        >
                            Redirection vers votre consultation...
                        </motion.p>
                    </div>

                    {/* Animated dots */}
                    <motion.div
                        className="flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 dark:bg-green-400"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
});

export default AnalysisCompleteNotice;
