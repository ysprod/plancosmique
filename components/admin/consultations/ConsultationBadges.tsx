'use client';
import { motion } from 'framer-motion';
import { Calendar, Check } from 'lucide-react';
import { memo } from 'react';

interface ConsultationBadgesProps {
    formattedDate: string;
    isPaid?: boolean;
}

const badgeBase =
    'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const ConsultationBadges = memo(
    ({ formattedDate, isPaid }: ConsultationBadgesProps) => {
        return (
            <div className="flex flex-wrap justify-center items-center gap-2 mb-2 w-full">
                <motion.span
                    whileHover={{ scale: 1.07 }}
                    tabIndex={0}
                    aria-label="Date de la consultation"
                    className={
                        badgeBase +
                        ' bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/30 dark:from-blue-700 dark:to-cyan-700 dark:shadow-blue-900/30'
                    }
                >
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                </motion.span>

                {isPaid && (
                    <motion.span
                        whileHover={{ scale: 1.07 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 }}
                        tabIndex={0}
                        aria-label="Consultation payée"
                        className={
                            badgeBase +
                            ' bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/30 dark:from-green-700 dark:to-emerald-700 dark:shadow-green-900/30'
                        }
                    >
                        <Check className="w-3 h-3" />
                        Payé
                    </motion.span>
                )}
            </div>
        );
    },
    (prev, next) =>
        prev.formattedDate === next.formattedDate &&
        prev.isPaid === next.isPaid
);

ConsultationBadges.displayName = 'ConsultationBadges';

export default ConsultationBadges;