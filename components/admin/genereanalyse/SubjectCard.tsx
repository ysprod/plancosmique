"use client";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";
import { CarteDuCielBase } from "@/lib/interfaces";
import SubjectInfoLine from "./SubjectInfoLine";
import SubjectLocation from "./SubjectLocation";

type CarteDuCielSubjet = CarteDuCielBase["sujet"];

interface SubjectCardProps {
  sujet: CarteDuCielSubjet;
}

const SubjectCard = memo(({ sujet }: SubjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-lg"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-1">
          {sujet.nom} {sujet.prenoms}
        </h2>
        <SubjectInfoLine
          dateNaissance={sujet.dateNaissance}
          heureNaissance={sujet.heureNaissance}
        />
      </div>
      <Sparkles className="w-8 h-8 opacity-80" />
    </div>
    <SubjectLocation lieuNaissance={sujet.lieuNaissance} />
  </motion.div>
));

SubjectCard.displayName = "SubjectCard";

export default SubjectCard;