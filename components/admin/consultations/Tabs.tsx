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
  { key: "carte", label: "Carte du Ciel", icon: Globe },
  { key: "mission", label: "Mission", icon: Target },
];

const Tabs = ({ tab, setTab }: TabsProps) => (
  <div className="mt-4 flex gap-2 rounded-2xl bg-gradient-to-br from-slate-100 to-white p-1 shadow-inner dark:from-zinc-800 dark:to-zinc-900">
    {TABS.map(({ key, label, icon: Icon }) => (
      <motion.button
        key={key}
        type="button"
        onClick={() => setTab(key)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cx(
          "relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3",
          "text-[13px] font-extrabold transition-all",
          tab === key
            ? "bg-gradient-to-r from-slate-900 to-black text-white shadow-lg dark:from-white dark:to-slate-100 dark:text-zinc-900"
            : "text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white"
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
        {tab === key && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          />
        )}
      </motion.button>
    ))}
  </div>
);

export default Tabs;
