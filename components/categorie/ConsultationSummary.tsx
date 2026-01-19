import { memo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Gift, User } from 'lucide-react';

interface ConsultationSummaryProps {
    consultation?: any;
    choix?: any;
}

const ConsultationSummary = memo<ConsultationSummaryProps>(function ConsultationSummary({
    consultation,
    choix
}) {
    if (!consultation && !choix) return null;

    const title = consultation?.title || choix?.title;
    const description = consultation?.description || choix?.description;
    const alternatives = consultation?.alternatives || choix?.offering?.alternatives || [];
    const formData = consultation?.formData;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-purple-200/50 dark:border-purple-700/30 shadow-lg"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        Résumé de votre consultation
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        En cours de traitement
                    </p>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                />
            </div>

            {/* Content Grid */}
            <div className="space-y-3 sm:space-y-4">
                {/* Title */}
                {title && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200/50 dark:border-purple-700/30"
                    >
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
                                Consultation
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                                {title}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Description */}
                {description && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/30"
                    >
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {description}
                        </p>
                    </motion.div>
                )}

                {/* Offerings */}
                {alternatives.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200/50 dark:border-amber-700/30"
                    >
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <Gift className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <p className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                                Offrandes sélectionnées
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {alternatives.map((alt: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.35 + index * 0.05 }}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-amber-200/50 dark:border-amber-700/30 shadow-sm"
                                >
                                    <span className="text-base">🎁</span>
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                        ×{alt.quantity}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* User Info */}
                {formData && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-700/30"
                    >
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                                Données soumises
                            </p>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                {formData.nom && formData.prenom 
                                    ? `${formData.prenom} ${formData.nom}`
                                    : 'Informations personnelles fournies'}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Footer note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/30"
            >
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                    Votre analyse personnalisée est en cours de génération
                </p>
            </motion.div>
        </motion.div>
    );
});

export default ConsultationSummary;
