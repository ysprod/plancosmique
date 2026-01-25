"use client";
import ConsultationCard from "@/components/consultations/ConsultationCard";
import { cx } from "@/lib/functions";
import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";

const ConsultationsGrid = memo(function ConsultationsGrid({
    consultations,
    onView,
    onDownload,
}: {
    consultations: any[];
    onView: (id: string) => void;
    onDownload: (id: string) => void;
}) {
    const reduceMotion = useReducedMotion();
    return (
        <motion.div
            layout={!reduceMotion}
            className={cx(
                "flex flex-col gap-2 sm:gap-3 w-full items-center justify-center"
            )}
        >
            {consultations.map((consultation, index) => {
                return (
                    <div className="w-full">
                        <ConsultationCard
                            key={String(consultation?._id ?? consultation?.id ?? `${index}`)}
                            consultation={consultation}
                            index={index}
                            onView={onView}
                            onDownload={onDownload}
                        />
                    </div>
                );
            })}
        </motion.div>
    );
});

export default ConsultationsGrid;