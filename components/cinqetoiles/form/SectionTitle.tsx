import { Sparkles } from "lucide-react";
import { memo } from "react";

const SectionTitle = memo(function SectionTitle({ title, }: { title: string; }) {

    return (
        <div className="w-full flex flex-col items-center justify-center text-center gap-1">
            <div className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-200">
                <Sparkles className="h-4 w-4" />
                <span>{title}</span>
            </div>
        </div>
    );
});

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;