import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

const Header = memo(() => (
    <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 
                 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mb-3"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Accueil</span>
            </Link>
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                        Conditions d'utilisation
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Mise à jour : 21 déc. 2025
                    </p>
                </div>
            </div>
        </div>
    </div>
));
Header.displayName = 'Header';

export default Header;
