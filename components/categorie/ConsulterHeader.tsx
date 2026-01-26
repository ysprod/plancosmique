import { memo } from 'react';
import { motion } from 'framer-motion';

interface ConsulterHeaderProps {
    title?: string;
}

const ConsulterHeader = memo<ConsulterHeaderProps>(function ConsulterHeader({ title = 'Consultation' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto mb-4 sm:mb-6"
        >
            <h1 className="text-xl sm:text-3xl lg:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent px-3">
                {title}
            </h1>
        </motion.div>
    );
});

export default ConsulterHeader;
