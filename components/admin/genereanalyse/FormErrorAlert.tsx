"use client";
import { AlertCircle } from "lucide-react";

interface FormErrorAlertProps {
    message: string;
}

export default function FormErrorAlert({ message }: FormErrorAlertProps) {
    return (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="text-sm font-semibold text-red-900 dark:text-red-200">Erreur</p>
                <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
            </div>
        </div>
    );
}