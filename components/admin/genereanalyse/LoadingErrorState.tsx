"use client";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function LoadingErrorState() {
    return (
        <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
        >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 
                    flex items-center justify-center shadow-2xl">
                <AlertCircle className="w-10 h-10 text-white" />
            </div>
        </motion.div>
    );
}