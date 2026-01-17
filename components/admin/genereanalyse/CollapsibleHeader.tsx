"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CollapsibleHeader({ title, isOpen, onToggle }: CollapsibleHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 text-left">
        {title}
      </h4>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </motion.div>
    </button>
  );
}