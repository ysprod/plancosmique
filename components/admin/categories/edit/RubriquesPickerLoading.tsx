"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import React from "react";

const RubriquesPickerLoading = React.memo(function RubriquesPickerLoading() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:border-purple-800/30 dark:from-purple-950/20 dark:via-zinc-900 dark:to-pink-950/20 p-6 shadow-lg"
    >
      {/* Animated gradient background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/30 to-transparent dark:via-purple-500/10 bg-[length:200%_200%]"
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center">
        {/* Animated icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative"
        >
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 opacity-50 rounded-full" />
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 flex items-center justify-center shadow-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Loading text */}
        <div className="space-y-1.5">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-sm font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent"
          >
            Chargement des rubriques
          </motion.p>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400"
              />
            ))}
          </div>
        </div>

        {/* Skeleton grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.3, 0.6, 0.3], y: 0 }}
              transition={{
                opacity: { duration: 1.5, repeat: Infinity, delay: i * 0.1 },
                y: { duration: 0.3, delay: i * 0.05 },
              }}
              className="h-8 rounded-lg bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default RubriquesPickerLoading;
