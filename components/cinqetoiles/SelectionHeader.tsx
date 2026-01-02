"use client";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import React, { memo } from "react";

const SelectionHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-6"
  >
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 3, repeat: Infinity }}
      className="inline-flex items-center gap-2 mb-3"
    >
      <Sparkles className="w-6 h-6 text-purple-600" />
      <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 \
                   to-pink-600 bg-clip-text text-transparent">
        LES 5 PORTES DE MON ÉTOILE
      </h2>
      <Star className="w-6 h-6 text-pink-600" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-base sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto \
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
