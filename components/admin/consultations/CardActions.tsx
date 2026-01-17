'use client';
import { motion } from 'framer-motion';
import { Eye, Loader2, Mail, Sparkles, Wand2 } from 'lucide-react';
import React from 'react';
import { memo, useCallback } from 'react';

interface CardActionsProps {
    isCompleted: boolean;
    isNotified: boolean;
    consultationId: string;
    canGenerateAnalysis?: boolean;
    onGenerateAnalysis?: (id: string) => void;
    isGenerating?: boolean;
}

const CardActions = memo(({ isCompleted, isNotified, consultationId, canGenerateAnalysis, onGenerateAnalysis, isGenerating }: CardActionsProps) => {
   const [engeneration, setEngeneration] = React.useState(false);
    const handleGenerateClick = useCallback(() => {
        if (onGenerateAnalysis) {
            onGenerateAnalysis(consultationId);
            setEngeneration(true);
        }
    }, [onGenerateAnalysis, consultationId]);

    return (
        <div className="flex flex-col items-center gap-2">
            {canGenerateAnalysis && onGenerateAnalysis && (
                <motion.button
                    onClick={handleGenerateClick}
                    disabled={isGenerating}
                    whileHover={{ scale: isGenerating ? 1 : 1.03, y: isGenerating ? 0 : -2 }}
                    whileTap={{ scale: isGenerating ? 1 : 0.97 }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 w-full max-w-xs
                              bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 
                              text-white text-xs rounded-xl font-bold
                              shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50
                              transition-all duration-300 relative overflow-hidden
                              disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {engeneration ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                            <span className="relative z-10">Analyse en cours de génération. Patientez svp!</span>
                        </>
                    ) : (
                        <>
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            />
                            <Wand2 className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">Générer Analyse</span>
                            <Sparkles className="w-4 h-4 relative z-10" />
                        </>
                    )}
                </motion.button>
            )}

            {isCompleted && (
                <motion.a
                    href={`/admin/consultations/${consultationId}`}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 w-full max-w-xs
                              bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 
                              text-white text-xs rounded-xl font-bold
                              shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50
                              transition-all duration-300 relative overflow-hidden group/btn"
                >
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                    <Eye className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Voir</span> 
                </motion.a>
            )}
 
            {isNotified && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full max-w-xs
                              bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 
                              text-white text-xs rounded-xl font-black
                              shadow-lg shadow-green-500/50 relative overflow-hidden"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white/20 rounded-xl"
                    />
                    <Mail className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Client déjà notifié</span>
                </motion.div>
            )}
        </div>
    );
}, (prev, next) => {
    return (
        prev.isCompleted === next.isCompleted &&
        prev.isNotified === next.isNotified &&
        prev.consultationId === next.consultationId
    );
});

CardActions.displayName = 'CardActions';

export default CardActions;