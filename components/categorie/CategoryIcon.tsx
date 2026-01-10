import { FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface CategoryIconProps {
  rubriqueCount: number;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ rubriqueCount }) => (
  <motion.div
    className="relative mt-0.5"
    whileHover={{ rotate: 15, scale: 1.1 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10">
      <FolderOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <motion.div
      className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-sm"
      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-[9px] font-black text-white">{rubriqueCount}</span>
    </motion.div>
  </motion.div>
);

export default CategoryIcon;
