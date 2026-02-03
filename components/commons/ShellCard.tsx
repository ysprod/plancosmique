import React, { memo } from "react";
import { cx } from '@/lib/functions';

const ShellCard = memo(function ShellCard({ children, }: { children: React.ReactNode; }) {
    return (
        <div
            className={cx(
                "relative overflow-hidden",
                "border-slate-200/90 bg-white shadow-xl shadow-black/5 backdrop-blur",
                "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
            )}
        >
            {children}
        </div>
    );
});

export default ShellCard;
