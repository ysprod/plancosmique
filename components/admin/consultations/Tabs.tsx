import { motion } from "framer-motion";
import { cx } from "./DisplayConsultationCard.utils";
import { Sparkles, Globe, Target } from "lucide-react";
import type { TabKey } from "./DisplayConsultationCard.types";
import React from "react";

interface TabsProps {
  tab: TabKey;
  setTab: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "resume", label: "Résumé", icon: Sparkles },
  { key: "carte", label: "Carte", icon: Globe },
  { key: "mission", label: "Mission", icon: Target },
];

const Tabs = ({ tab, setTab }: TabsProps) => (
  <motion.div 
    className="mt-3 flex gap-1.5 overflow-x-auto rounded-2xl bg-gradient-to-br from-slate-100 via-white to-slate-50 p-1 shadow-lg dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    {TABS.map(({ key, label, icon: Icon }, index) => (
      <motion.button
        key={key}
        type="button"
        onClick={() => setTab(key)}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
        className={cx(
          "relative flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2",
          "text-[11px] font-black transition-all",
          tab === key
            ? "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/30"
            : "text-slate-600 hover:bg-slate-50/50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
        )}
      >
        {tab === key && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 shadow-xl"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <motion.div
          className="relative z-10"
          animate={tab === key ? { rotate: 360 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-3.5 w-3.5" />
        </motion.div>
        <span className="relative z-10">{label}</span>
      </motion.button>
    ))}
  </motion.div>
);

export default Tabs;
