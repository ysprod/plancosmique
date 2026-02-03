"use client";
import React, { memo } from "react";

const CenterShell = memo(function CenterShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full  grid place-items-center">
            {/* fond premium, statique (pas de layer animé) */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
            {children}
        </main>
    );
});

export default CenterShell;