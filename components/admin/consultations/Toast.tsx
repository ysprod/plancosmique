import { motion } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { memo, useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = memo(({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white \
                    px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20">
        <Bell className="w-4 h-4 flex-shrink-0 animate-pulse" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
});
Toast.displayName = 'Toast';

export default Toast;