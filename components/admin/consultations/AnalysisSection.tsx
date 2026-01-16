'use client';

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { memo, useState, useMemo, useCallback } from "react";

const AnalysisSection = memo(({
    title,
    content,
    icon: Icon,
    iconColor = "text-purple-600",
    index = 0
}: {
    title: string;
    content: string | any;
    icon: any;
    iconColor?: string;
    index?: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const displayContent = useMemo(() => {
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) return content.join('\n');
        if (typeof content === 'object' && content !== null) {
            return JSON.stringify(content, null, 2);
        }
        return String(content);
    }, [content]);

    // Toggle handler mémorisé
    const handleToggle = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    // Ne rien afficher si vide
    if (!content || displayContent.length === 0) return null;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-1.5"
        >
            <motion.button
                whileHover={{ scale: 1.005, x: 2 }}
                whileTap={{ scale: 0.995 }}
                onClick={handleToggle}
                className="w-full flex items-center justify-between gap-2 p-2 rounded-lg
                 bg-gradient-to-r from-purple-50/50 to-pink-50/50 
                 dark:from-purple-900/10 dark:to-pink-900/10
                 border border-purple-200/50 dark:border-purple-800/50
                 hover:from-purple-50 hover:to-pink-50
                 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20
                 transition-all shadow-sm hover:shadow-md"
            >
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <motion.div
                        animate={{ rotate: isExpanded ? 360 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Icon className={`w-3 h-3 flex-shrink-0 ${iconColor}`} />
                    </motion.div>
                    <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 truncate">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <motion.span
                        animate={{ scale: isExpanded ? 1.05 : 1 }}
                        className="text-[8px] font-semibold text-purple-600 dark:text-purple-400 
                         px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/30"
                    >
                        {isExpanded ? 'Réduire' : 'Voir'}
                    </motion.span>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                </div>
            </motion.button>

            <AnimatePresence mode="wait">
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="mt-1 p-2 rounded-lg bg-white dark:bg-gray-800 
                          border border-gray-200 dark:border-gray-700 shadow-sm">
                            <pre className="text-[9px] leading-relaxed text-gray-700 dark:text-gray-300 
                            whitespace-pre-wrap font-sans max-h-48 overflow-y-auto
                            scrollbar-thin scrollbar-thumb-purple-300 dark:scrollbar-thumb-purple-700
                            scrollbar-track-transparent">
                                {displayContent}
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.title === nextProps.title &&
        prevProps.content === nextProps.content &&
        prevProps.iconColor === nextProps.iconColor
    );
});

AnalysisSection.displayName = 'AnalysisSection';

export default AnalysisSection;