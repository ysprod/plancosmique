'use client';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Users } from 'lucide-react';
import { memo } from 'react';

interface ClientInfoProps {
    clientName: string;
    email: string | null;
    phone?: string | null;
    tierceName?: string | null;
    hasTierce?: boolean;
}

const ClientInfo = memo(({ clientName, email, phone, tierceName, hasTierce }: ClientInfoProps) => {
    return (
        <div className="flex flex-col items-center gap-2 mb-3">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl
                          bg-gradient-to-r from-violet-50 to-purple-50
                          dark:from-violet-950/30 dark:to-purple-950/30
                          border border-violet-200/50 dark:border-violet-800/50
                          w-full max-w-xs"
            >
                <User className="w-4 h-4 text-violet-600 dark:text-violet-400 flex-shrink-0" />
                <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {clientName || 'Non renseigné'}
                </span>
            </motion.div>

            {hasTierce && tierceName && (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl
                              bg-gradient-to-r from-pink-50 to-rose-50
                              dark:from-pink-950/30 dark:to-rose-950/30
                              border border-pink-200/50 dark:border-pink-800/50
                              w-full max-w-xs"
                >
                    <Users className="w-4 h-4 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                        {tierceName}
                    </span>
                </motion.div>
            )}

            {email && (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl
                              bg-gradient-to-r from-blue-50 to-cyan-50
                              dark:from-blue-950/30 dark:to-cyan-950/30
                              border border-blue-200/50 dark:border-blue-800/50
                              w-full max-w-xs"
                >
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        {email}
                    </span>
                </motion.div>
            )}

            {phone && (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl
                              bg-gradient-to-r from-emerald-50 to-teal-50
                              dark:from-emerald-950/30 dark:to-teal-950/30
                              border border-emerald-200/50 dark:border-emerald-800/50
                              w-full max-w-xs"
                >
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        {phone}
                    </span>
                </motion.div>
            )}
        </div>
    );
}, (prev, next) => {
    return prev.clientName === next.clientName && 
           prev.email === next.email && 
           prev.phone === next.phone &&
           prev.tierceName === next.tierceName &&
           prev.hasTierce === next.hasTierce;
});

ClientInfo.displayName = 'ClientInfo';

export default ClientInfo;
