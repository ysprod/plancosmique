import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { memo } from "react";

const RegisterLogoHeader = memo(() => (
  <Link
    href="/"
    className="block mb-4 group"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center"
    >
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden 
                    shadow-lg group-hover:shadow-xl transition-shadow">
        <Image
          src="/logo.png"
          alt="Mon Étoile Logo"
          fill
          className="object-contain p-3"
          priority
        />
      </div>
    </motion.div>
  </Link>
));

RegisterLogoHeader.displayName = 'RegisterLogoHeader';

export default RegisterLogoHeader;