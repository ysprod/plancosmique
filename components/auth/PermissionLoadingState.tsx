import React from 'react';
import { Loader2 } from 'lucide-react';

export const PermissionLoadingState: React.FC = () => {
    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50">
            <div className="text-center">
                <Loader2 className="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" />
                <p className="text-slate-600 text-lg">Vérification des permissions...</p>
            </div>
        </div>
    );
};
