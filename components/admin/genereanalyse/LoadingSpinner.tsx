"use client";
import { GenerationStep } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { memo } from "react";
import { getStepConfig } from "@/lib/constants/loadingStepConfig";
import OrbitingSparkles from "./OrbitingSparkles";
import LoadingSuccessState from "./LoadingSuccessState";
import LoadingErrorState from "./LoadingErrorState";
import LoadingMessage from "./LoadingMessage";

interface LoadingSpinnerProps {
  step: GenerationStep;
}

const LoadingSpinner = memo(({ step }: LoadingSpinnerProps) => {
  const config = getStepConfig(step);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center 
                  bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 
                  dark:from-gray-950/80 dark:via-purple-950/30 dark:to-gray-900/80 
                  backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 px-4"
      >
        {(step === "loading") && <OrbitingSparkles />}

        {step === "success" && <LoadingSuccessState />}

        {step === "error" && <LoadingErrorState />}

        <LoadingMessage
          message={config.message}
          showDots={step === "loading"}
        />
      </motion.div>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;