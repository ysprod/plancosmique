"use client";
import React from "react";

export default function CreatePromptShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center px-2 py-4 animate-fade-in">
      <div className="w-full max-w-2xl flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
