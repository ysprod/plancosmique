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
        whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center gap-1.5 px-3 py-2 
                 bg-gradient-to-r ${gradient} text-white 
                 text-[11px] rounded-xl font-bold
                 transition-all shadow-md hover:shadow-lg
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md
                 border border-white/20`}
    >
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
    </motion.button>
));
ActionButton.displayName = 'ActionButton';

export default ActionButton;
