"use client";
import { Menu } from "lucide-react";
import React from "react";

interface AdminShellTopBarProps {
  setShowMobileSidebar: (show: boolean) => void;
}

export function AdminShellTopBar({ setShowMobileSidebar }: AdminShellTopBarProps) {
  return (
    <div className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
      <button
        onClick={() => setShowMobileSidebar(true)}
        className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          {/* Icon */}
          <span className="inline-block w-5 h-5"><svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7L3 9h7z"></path></svg></span>
        </div>
        <span className="text-sm font-black text-gray-900 dark:text-white">Admin</span>
      </div>
      <div className="w-10" />
    </div>
  );
}