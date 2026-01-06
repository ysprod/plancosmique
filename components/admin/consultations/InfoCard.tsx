import { motion } from 'framer-motion';
import { memo } from 'react';

interface InfoCardProps {
    icon: any;
    label: string;
    value: string;
    iconColor: string;
    index?: number;
}

const InfoCard = memo(({ icon: Icon, label, value, iconColor, index = 0 }: InfoCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm rounded-xl p-3
                 border border-white/10 hover:border-white/20 transition-all shadow-lg"
    >
        <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`p-1.5 rounded-lg bg-white/10 ${iconColor}`}
        >
            <Icon className="w-4 h-4" />
        </motion.div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-purple-300 font-medium">{label}</p>
            <p className="text-sm text-white font-bold truncate">{value}</p>
        </div>
    </motion.div>
));

InfoCard.displayName = 'InfoCard';

export default InfoCard;
