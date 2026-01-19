import { memo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, User, MapPin, Clock, Star } from 'lucide-react';

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
    const formData = consultation?.formData;

    // Format date de naissance
    const formatBirthDate = (date: string) => {
        if (!date) return null;
        const d = new Date(date);
        return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const birthDate = formatBirthDate(formData?.dateOfBirth || formData?.dateNaissance);
    const birthTime = formData?.timeOfBirth || formData?.heureNaissance;
    const birthCity = formData?.cityOfBirth || formData?.villeNaissance;
    const fullName = formData?.prenoms || formData?.firstName 
        ? `${formData?.prenoms || formData?.firstName} ${formData?.nom || formData?.lastName}` 
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="backdrop-blur-xl bg-gradient-to-br from-white/90 via-purple-50/80 to-indigo-50/80 dark:from-slate-900/90 dark:via-purple-950/30 dark:to-indigo-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-purple-300/50 dark:border-purple-600/40 shadow-2xl shadow-purple-500/10"
        >
            {/* Header avec gradient animé */}
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <motion.div 
                    animate={{ 
                        boxShadow: [
                            '0 0 20px rgba(168, 85, 247, 0.4)',
                            '0 0 30px rgba(168, 85, 247, 0.6)',
                            '0 0 20px rgba(168, 85, 247, 0.4)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 flex items-center justify-center"
                >
                    <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Résumé de votre consultation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        Analyse astrologique détaillée
                    </p>
                </div>
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg"
                >
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-xs font-semibold text-white">En cours</span>
                </motion.div>
            </div>

            {/* Content Grid */}
            <div className="space-y-3 sm:space-y-4">
                {/* Title */}
                {title && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative overflow-hidden flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-100 dark:from-purple-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 border-2 border-purple-300/50 dark:border-purple-600/40 shadow-lg"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0 relative z-10" />
                        <div className="flex-1 min-w-0 relative z-10">
                            <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-bold mb-1.5 uppercase tracking-wide">
                                📋 Consultation
                            </p>
                            <p className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
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
                        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/60 dark:to-slate-800/40 border border-slate-300/50 dark:border-slate-600/40 shadow-md"
                    >
                        <div className="flex items-start gap-2 mb-2">
                            <Star className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                                Description
                            </p>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                            {description}
                        </p>
                    </motion.div>
                )} 
            
                {formData && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.38 }}
                        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-100 dark:from-blue-900/40 dark:via-cyan-900/40 dark:to-blue-900/40 border-2 border-blue-300/50 dark:border-blue-600/40 shadow-lg"
                    >
                        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                            <User className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                            <p className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wide">
                                👤 Informations astrologiques
                            </p>
                        </div>
                        
                        <div className="space-y-2.5">
                            {/* Nom complet */}
                            {fullName && (
                                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-blue-700/30">
                                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-0.5">Identité</p>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {fullName}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Date de naissance */}
                            {birthDate && (
                                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-blue-700/30">
                                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-0.5">Date de naissance</p>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {birthDate}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Heure et lieu sur la même ligne pour desktop */}
                            {(birthTime || birthCity) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {/* Heure de naissance */}
                                    {birthTime && (
                                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-blue-700/30">
                                            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-0.5">Heure</p>
                                                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                    {birthTime}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Lieu de naissance */}
                                    {birthCity && (
                                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-blue-700/30">
                                            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-0.5">Lieu</p>
                                                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 capitalize">
                                                    {birthCity}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div> 
        </motion.div>
    );
});

export default ConsultationSummary;
