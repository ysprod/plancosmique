'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import HoroscopeCard from '@/components/horoscope/HoroscopeCard';
import { BackendHoroscope } from '@/lib/interfaces';

interface HoroscopeListProps {
  horoscopes: BackendHoroscope[];
  activeTab: string;
  onHoroscopeClick: (horoscope: BackendHoroscope) => void;
}

export default function HoroscopeList({ horoscopes, activeTab, onHoroscopeClick }: HoroscopeListProps) {
  if (!horoscopes.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-600" />
        Vos horoscopes {activeTab}s
      </h2>
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {horoscopes.slice(0, 3).map(horoscope => (
            <HoroscopeCard
              key={horoscope._id}
              horoscope={horoscope}
              onClick={() => onHoroscopeClick(horoscope)}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
