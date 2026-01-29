"use client";
import { motion } from "framer-motion";
import { memo } from "react";

const SelectionHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full text-center mb-6"
  >
    <h2 className="text-2xl sm:text-3xl font-black  ">
      LES 5 PORTES DE MON ÉTOILE
    </h2>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className=" text-gray-600 dark:text-gray-400   mx-auto \
               leading-relaxed px-4"
    >
      Commençons par une consultation qui dévoile les cinq forces essentielles qui structurent
      votre identité cosmique.
      C’est une étape préalable et fondamentale pour comprendre qui vous êtes, comment
      vous vibrez, ce que vous ressentez, ce vers quoi vous avancez, et la manière dont vous
      vous reliez au monde.
    </motion.p>
  </motion.div>
));

SelectionHeader.displayName = 'SelectionHeader';

export default SelectionHeader;