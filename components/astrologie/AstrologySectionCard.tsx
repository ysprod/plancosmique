import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ICONS } from "./AstrologySectionsData";

interface AstrologySectionCardProps {
  section: any;
  index: number;
}

const AstrologySectionCard = ({ section, index }: AstrologySectionCardProps) => {
  const Icon = ICONS[section.icon as keyof typeof ICONS];
  return (
    <Link key={section.id} href={section.link}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-purple-300 transition-all h-full overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        <div className="relative z-10">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-xl mb-4 sm:mb-6`}
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h2 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent mb-3`}>
            {section.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            {section.description}
          </p>
          <motion.div
            className="flex items-center gap-2 text-sm sm:text-base font-bold text-purple-700 group-hover:text-purple-900 transition-colors"
            whileHover={{ x: 4 }}
          >
            <span>Découvrir</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl sm:rounded-3xl`} />
      </motion.div>
    </Link>
  );
};

export default AstrologySectionCard;
