"use client";
import { Download, Share2 } from "lucide-react";

interface HeaderActionsProps {
    onPrint?: () => void;
    onShare?: () => void;
}

export default function HeaderActions({ onPrint, onShare }: HeaderActionsProps) {
    return (
        <div className="flex gap-2">
            <button
                onClick={onPrint}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
            <button
                onClick={onShare}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                <Share2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
        </div>
    );
}