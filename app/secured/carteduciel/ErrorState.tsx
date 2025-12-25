import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { memo } from "react";

const ErrorState = memo(() => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950"
    >
        <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl border border-red-500/30 p-8 text-center max-w-md">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">Accès refusé</h3>
            <p className="text-red-200">Aucun utilisateur connecté. Veuillez vous connecter.</p>
        </div>
    </motion.div>
));
ErrorState.displayName = 'ErrorState';

export default ErrorState;