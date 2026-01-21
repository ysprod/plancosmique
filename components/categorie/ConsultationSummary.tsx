import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { memo } from 'react';

interface ConsultationSummaryProps {
    consultation?: any;
    choix?: any;
}

const ConsultationSummary = memo<ConsultationSummaryProps>(function ConsultationSummary({
    consultation, choix
}) {
    const title = consultation?.title || choix?.title;
    return (
        <div className="space-y-3 sm:space-y-4">
            {title && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative overflow-hidden flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-100 dark:from-purple-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 border-2 border-purple-300/50 dark:border-purple-600/40 shadow-lg"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent " />
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0 relative z-10" />
                    <div className="flex-1 min-w-0 relative z-10">
                        <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-bold mb-1.5 uppercase tracking-wide">
                            Consultation
                        </p>
                        <p className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                            {title}
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
});

export default ConsultationSummary;