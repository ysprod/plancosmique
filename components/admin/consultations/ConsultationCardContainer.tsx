"use client";

import { motion } from "framer-motion";
import { memo, type ReactNode } from "react";

import { cardVariants } from "./DisplayConsultationCard.constants";
import { cx } from "@/lib/functions";

interface ConsultationCardContainerProps {
    consultationId: string;
    children: ReactNode;
}

const ConsultationCardContainer = memo(function ConsultationCardContainer({
    consultationId,
    children,
}: ConsultationCardContainerProps) {
    return (
        <div className="w-full px-1 sm:px-2 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
            <motion.article
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layoutId={`consultation-${consultationId}`}
                className={cx(
                    "relative isolate overflow-hidden  p-4 sm:p-5",
                    "text-center",
                    "  bg-gradient-to-br from-white/92 via-white/88 to-white/92",
                    "shadow-2xl shadow-black/5 backdrop-blur-xl",
                    "dark:border-zinc-800/45 dark:from-zinc-950/70 dark:via-zinc-900/60 dark:to-zinc-950/70 dark:shadow-black/35"
                )}
            >
                {children}
            </motion.article>

            
        </div>
    );
});

ConsultationCardContainer.displayName = "ConsultationCardContainer";

export default ConsultationCardContainer;
