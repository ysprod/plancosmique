'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WelcomeHeader() {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center mb-6"
    >
      <Image
        src="/logo.png"
        alt="Mon Étoile"
        width={80}
        height={80}
        className="mx-auto mb-2"
        priority
      />
      <h1 className="text-3xl sm:text-4xl font-black text-black">MON ÉTOILE</h1>
    </motion.div>
  );
}