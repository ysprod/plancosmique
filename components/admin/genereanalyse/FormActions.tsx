"use client";
import { Save, X } from "lucide-react";

interface FormActionsProps {
    onCancel: () => void;
    isSaving: boolean;
    onSave: () => void;
}

export default function FormActions({ onCancel, isSaving, onSave }: FormActionsProps) {
    return (
        <div className="w-full flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                aria-busy={isSaving}
                className="flex-1 h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
                {isSaving ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enregistrement...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        Enregistrer
                    </>
                )}
            </button>

            <button
                type="button"
                onClick={onCancel}
                disabled={isSaving}
                className="flex-1 h-12 px-6 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
                <X className="w-5 h-5" />
                Annuler
            </button>
        </div>
    );
}