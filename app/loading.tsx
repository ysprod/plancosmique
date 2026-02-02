import { memo } from 'react';

const Loader = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-gray-900 animate-fade-in">
    <div className="flex flex-col items-center justify-center gap-2 w-full max-w-xs px-4 py-6 rounded-2xl shadow-xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border border-purple-100 dark:border-purple-900">
      <div className="relative flex items-center justify-center">
        <div className="absolute animate-pulse rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 dark:from-purple-700 dark:via-pink-700 dark:to-indigo-700 opacity-30 w-16 h-16" />
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500 dark:border-purple-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-purple-600 dark:text-purple-300 animate-float">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" opacity="0.2" />
            <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
      <span className="text-sm sm:text-base font-semibold text-center text-purple-700 dark:text-purple-200 mt-2 animate-fade-in">Chargement cosmique...</span>
    </div>

    <style>{`
      @keyframes animate-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .animate-float { animation: animate-float 2.2s infinite ease-in-out; }
      .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both; }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `}</style>
  </div>
));

export default Loader;
