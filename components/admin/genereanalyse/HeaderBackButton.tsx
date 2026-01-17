"use client";
import { ArrowLeft } from "lucide-react";

interface HeaderBackButtonProps {
    onBack: () => void;
}

export default function HeaderBackButton({ onBack }: HeaderBackButtonProps) {
    return (
        <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold text-sm">Retour</span>
        </button>
    );
}