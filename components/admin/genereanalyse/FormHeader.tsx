"use client";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function FormHeader() {
    return (
        <div className="flex items-center gap-3 mb-6">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            >
                <FileText className="w-6 h-6 text-white" />
            </motion.div>
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Modifier l'analyse
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Éditez les informations de l'analyse générée
                </p>
            </div>
        </div>
    );
}