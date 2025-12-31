import Link from 'next/link';
import React, { memo } from 'react';

const ActionButtons = memo(() => (
    <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
            href="/auth/register"
            className="flex-1 py-2.5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 
               hover:from-purple-700 hover:to-pink-700 text-white font-semibold 
               rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
               text-center text-sm"
        >
            Créer un compte
        </Link>
        <Link
            href="/auth/login"
            className="flex-1 py-2.5 px-6 bg-white dark:bg-gray-800 
               hover:bg-gray-50 dark:hover:bg-gray-700 
               text-gray-900 dark:text-gray-100 font-semibold 
               rounded-xl border-2 border-gray-200 dark:border-gray-700 
               hover:border-purple-500 dark:hover:border-purple-500
               transition-all duration-200 text-center text-sm"
        >
            Se connecter
        </Link>
    </div>
));
ActionButtons.displayName = 'ActionButtons';

export default ActionButtons;
