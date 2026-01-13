import { motion } from 'framer-motion';
import { Calendar, Star, Sparkles, Check } from 'lucide-react';
import { memo } from 'react';

interface ConsultationBadgesProps {
    formattedDate: string;
    hasResultData: boolean;
    hasCarteDuCiel: boolean;
    isPaid?: boolean;
}

const ConsultationBadges = memo(({ formattedDate, hasResultData, hasCarteDuCiel, isPaid }: ConsultationBadgesProps) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
            <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold
                          bg-gradient-to-r from-blue-500 to-cyan-500 text-white
                          shadow-md shadow-blue-500/30"
            >
                <Calendar className="w-3 h-3" />
                {formattedDate}
            </motion.span>

            {hasResultData && (
                <motion.span
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold
                              bg-gradient-to-r from-emerald-500 to-teal-500 text-white
                              shadow-md shadow-emerald-500/30"
                >
                    🔢 Numérologie
                </motion.span>
            )}

            {hasCarteDuCiel && (
                <motion.span
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold
                              bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                              shadow-md shadow-indigo-500/30"
                >
                    ⭐ Astrologie
                </motion.span>
            )}

            {isPaid && (
                <motion.span
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold
                              bg-gradient-to-r from-green-500 to-emerald-500 text-white
                              shadow-md shadow-green-500/30"
                >
                    <Check className="w-3 h-3" />
                    Payé
                </motion.span>
            )}
        </div>
    );
}, (prev, next) => {
    return (
        prev.formattedDate === next.formattedDate &&
        prev.hasResultData === next.hasResultData &&
        prev.hasCarteDuCiel === next.hasCarteDuCiel &&
        prev.isPaid === next.isPaid
    );
});

ConsultationBadges.displayName = 'ConsultationBadges';

export default ConsultationBadges;
