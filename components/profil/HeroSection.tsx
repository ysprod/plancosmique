"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { User, Star } from "lucide-react";

export default function HeroSection({ user }: { user: any }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >
      {/* Avatar + Badge */}
      <div className="relative inline-block mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative w-36 h-36 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-1.5 shadow-2xl shadow-violet-500/40"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="Avatar"
                width={144}
                height={144}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-20 h-20 text-violet-600" />
            )}
          </div>
        </motion.div>
        {/* Badge étoile animé */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.2, rotate: 360 }}
          className="absolute -top-2 -right-2 w-14 h-14 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/40 cursor-pointer"
        >
          <Star className="w-7 h-7 text-white fill-white" />
        </motion.div>
        {/* Badge niveau */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-lg"
        >
          <p className="text-xs font-black text-white whitespace-nowrap">⚡ PREMIUM</p>
        </motion.div>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl sm:text-2xl lg:text-2xl font-black mb-4"
      >
        <span className="text-slate-900">Bienvenue, {user?.firstName || "Âme Éclairée"}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-slate-600 max-w-4xl mx-auto leading-relaxed"
      >
        Ici, tu avances guidé(e) par la lumière de tes génies tutélaires et la présence bienveillante de tes ancêtres.
      </motion.p>
    </motion.section>
  );
}
