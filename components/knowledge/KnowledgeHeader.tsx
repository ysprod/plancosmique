'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

interface KnowledgeHeaderProps {
  onShare: () => void;
}

const KnowledgeHeader: React.FC<KnowledgeHeaderProps> = ({ onShare }) => (
  <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <Link href="/secured/knowledge">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </motion.button>
        </Link>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  </div>
);

export default KnowledgeHeader;
