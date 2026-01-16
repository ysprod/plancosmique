'use client';
import { AnimatePresence, motion } from "framer-motion";
import Slide4Section from "@/app/secured/cinqetoiles/Slide4Section";
import { User } from "@/lib/interfaces";

interface ProfilNonPremiumSectionProps {
  userdata?: User;
}

const ProfilNonPremiumSection: React.FC<ProfilNonPremiumSectionProps> = ({ userdata }) => (
  <div className="max-w-7xl mx-auto">
    <AnimatePresence mode="wait">
      <motion.div
        key="consultation"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Slide4Section/>
      </motion.div>
    </AnimatePresence>
  </div>
);

export default ProfilNonPremiumSection;
