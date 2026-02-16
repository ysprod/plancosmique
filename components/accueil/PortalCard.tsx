'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface PortalCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  icon?: LucideIcon;
  accentColor?: string;
  delay?: number;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: delay * 0.15
    }
  })
};

function PortalCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  icon: Icon,
  accentColor = 'from-purple-500 to-pink-500',
  delay = 0
}: PortalCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={delay}
    >
      <Link href={href} className="block group">
        <motion.article 
          className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-500"
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Image container */}
          <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${accentColor} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            
            {/* Icon badge */}
            {Icon && (
              <motion.div 
                className={`absolute top-4 right-4 p-3 rounded-xl bg-gradient-to-br ${accentColor} shadow-lg`}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <motion.h3 
              className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300"
            >
              {title}
            </motion.h3>
            
            <p className="text-purple-200/70 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
              {description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-purple-300 group-hover:text-amber-300 transition-colors duration-300">
              <span className="text-sm font-medium">Découvrir</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Glow effect on hover */}
          <motion.div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

export default memo(PortalCard);
