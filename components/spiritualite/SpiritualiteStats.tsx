import { motion } from 'framer-motion';
import { BookOpen, Eye, Heart } from 'lucide-react';

interface Props {
  articles: number;
  views: number;
  likes: number;
}

export default function SpiritualiteStats({ articles, views, likes }: Props) {
  const stats = [
    { icon: BookOpen, label: 'Articles', value: articles },
    { icon: Eye, label: 'Lectures', value: views },
    { icon: Heart, label: "J'aime", value: likes }
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6 sm:mt-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
        >
          <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          <span className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</span>
          <span className="text-xs sm:text-sm text-gray-600">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
