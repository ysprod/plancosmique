import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface PermissionDeniedProps {
    message: string;
    userRole?: string;
}

export const PermissionDenied: React.FC<PermissionDeniedProps> = ({
    message,
    userRole,
}) => {
    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-200">
                <ShieldAlert className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Permission refusée
                </h2>
                <p className="text-slate-600 mb-4">{message}</p>
                {userRole && (
                    <p className="text-sm text-slate-500">
                        Votre rôle actuel : <span className="font-semibold">{userRole}</span>
                    </p>
                )}
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
                >
                    Retour
                </button>
            </div>
        </div>
    );
};