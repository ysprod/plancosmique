import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { memo } from "react";

const LoginLogoHeader = memo(() => (
  <Link
    href="/"
    className="block mb-6 group"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center"
    >
      <div className="relative w-24 h-24 rounded-2xl overflow-hidden                     
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

LoginLogoHeader.displayName = 'LoginLogoHeader';

export default LoginLogoHeader;
