"use client";
import React, { memo } from "react";

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

const GlassCard = memo(function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        "w-full rounded-3xl",
        "border border-black/10 dark:border-white/10",
        "bg-white dark:bg-slate-950/55",
        "backdrop-blur-xl",
        "shadow-[0_18px_56px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_56px_rgba(0,0,0,0.30)]",
        "px-3 py-3 sm:px-4 sm:py-4",
        className
      )}
    >
      {children}
    </section>
  );
});
GlassCard.displayName = "GlassCard";
export default GlassCard;
