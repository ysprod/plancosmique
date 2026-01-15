"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Target } from "lucide-react";
import { memo } from "react";

interface ConsultationCardUserInfoProps {
  dateNaissance: string;
  heureNaissance: string;
  lieuNaissance: string;
  mostFrequentSign: string;
}

const InfoCard = ({ icon: Icon, value, label, gradient, delay }: any) => (
  <motion.div
    className="group relative overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-white/95 to-white/85 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl dark:border-zinc-700/50 dark:from-zinc-800/95 dark:to-zinc-900/85"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-10"
      style={{ background: gradient }}
    />
    <motion.div 
      className="relative mx-auto mb-1.5 inline-flex rounded-xl p-1.5"
      style={{ background: `${gradient.split(' ')[0]}15` }}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon className="h-3.5 w-3.5" style={{ color: gradient.split(' ')[1] }} />
    </motion.div>
    <div className="text-[11px] font-black text-slate-900 dark:text-white">{value}</div>
    <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-400">{label}</div>
  </motion.div>
);

const ConsultationCardUserInfo = memo(function ConsultationCardUserInfo({
  dateNaissance,
  heureNaissance,
  lieuNaissance,
  mostFrequentSign,
}: ConsultationCardUserInfoProps) {
  return (
    <section className="relative z-10 mx-auto mt-3 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
      <InfoCard icon={Calendar} value={dateNaissance} label="Naissance" gradient="linear-gradient(to-br, #f59e0b, #d97706)" delay={0} />
      <InfoCard icon={Clock} value={heureNaissance} label="Heure" gradient="linear-gradient(to-br, #3b82f6, #2563eb)" delay={0.05} />
      <InfoCard icon={MapPin} value={lieuNaissance} label="Lieu" gradient="linear-gradient(to-br, #10b981, #059669)" delay={0.1} />
      <InfoCard icon={Target} value={mostFrequentSign} label="Dominant" gradient="linear-gradient(to-br, #a855f7, #9333ea)" delay={0.15} />
    </section>
  );
});

ConsultationCardUserInfo.displayName = "ConsultationCardUserInfo";
export default ConsultationCardUserInfo;
