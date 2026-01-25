import { motion } from 'framer-motion';
import { User, Crown } from 'lucide-react';

export default function MobileUserCard({ user, userBadge }: { user: any, userBadge: { text: string, label: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 via-fuchsia-50 to-violet-50 dark:from-violet-950/50 dark:via-fuchsia-950/50 dark:to-violet-950/50 border-2 border-violet-100 dark:border-slate-700 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-xl">
            <User className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-2 -right-2"
          >
            <Crown className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-black text-slate-900 dark:text-white truncate">
            {user?.username || 'Utilisateur'}
          </p>
          <p className="text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text font-bold">
            {userBadge.label} {userBadge.text.includes('⭐') ? '⭐' : '⚡'}
          </p>
          {user?.email && (
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
