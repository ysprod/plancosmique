import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { memo, useRef, useEffect, useCallback } from "react";

const ErrorToast = memo(({    message,    onClose}: {
    message: string;
    onClose: () => void;
}) => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timeoutRef.current = setTimeout(onClose, 4000); // Réduit à 4s
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [onClose]);

    const handleClose = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        onClose();
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                }
            }}
            exit={{
                opacity: 0,
                y: 25,
                scale: 0.94,
                transition: {
                    duration: 0.15
                }
            }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-full max-w-xs sm:max-w-sm"
        >
            <div className="bg-gradient-to-br from-red-500 to-rose-600 backdrop-blur-xl \
                          text-white p-3 sm:p-4 rounded-2xl shadow-2xl shadow-red-500/20 \
                          flex items-start gap-3 border border-red-400/40">
                <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold mb-1 opacity-95">Erreur</p>
                    <p className="text-xs leading-relaxed opacity-90 line-clamp-2">
                        {message}
                    </p>
                </div>
             
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 \
                             hover:bg-white/20 transition-colors duration-150 \
                             flex items-center justify-center text-sm \
                             active:scale-95"
                    aria-label="Fermer"
                >
                    ×
                </button>
            </div>
        </motion.div>
    );
});

ErrorToast.displayName = 'ErrorToast';

export default ErrorToast;