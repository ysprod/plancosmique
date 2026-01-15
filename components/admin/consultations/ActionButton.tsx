import { motion } from 'framer-motion';
import { memo } from 'react';

interface ActionButtonProps {
    onClick: () => void;
    icon: any;
    label: string;
    gradient: string;
    disabled?: boolean;
}

const ActionButton = memo(({ onClick, icon: Icon, label, gradient, disabled = false }: ActionButtonProps) => (
    <motion.button
        whileHover={!disabled ? { scale: 1.03, y: -3 } : {}}
        whileTap={!disabled ? { scale: 0.96 } : {}}
        onClick={onClick}
        disabled={disabled}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`group relative flex flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-white/30 bg-gradient-to-r ${gradient} px-3 py-2.5 text-[11px] font-black text-white shadow-lg transition-all hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-lg sm:flex-initial`}
    >
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
        />
        <motion.div
            animate={disabled ? {} : { rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <Icon className="relative z-10 h-4 w-4" />
        </motion.div>
        <span className="relative z-10">{label}</span>
    </motion.button>
));

ActionButton.displayName = 'ActionButton';

export default ActionButton;