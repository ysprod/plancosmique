'use client';

import { motion } from "framer-motion";
import React from "react";
import { ConsultationSection } from "@/components/vie-personnelle/ConsultationSection";
import type { Rubrique } from "@/lib/interfaces";

interface RubriqueConsultationSectionProps {
    rubrique: Rubrique;
}

const RubriqueConsultationSection: React.FC<RubriqueConsultationSectionProps> = ({ rubrique }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
    >
        <ConsultationSection rubrique={rubrique} />
    </motion.div>
);

export default RubriqueConsultationSection;