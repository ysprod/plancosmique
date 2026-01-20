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
          
          
            {children}       
        </div>
    );
});

ConsultationCardContainer.displayName = "ConsultationCardContainer";

export default ConsultationCardContainer;