'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FloatingParticle } from './FloatingParticle';
import { OrbitingStar } from './OrbitingStar'; 

const LoadingFallbackComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 
                    bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 
                    overflow-hidden relative">
      {/* Background Animated Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 sm:-top-40 sm:-left-40 w-64 h-64 sm:w-96 sm:h-96 
                   bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 sm:-bottom-40 sm:-right-40 w-64 h-64 sm:w-96 sm:h-96 
                   bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />

      <FloatingParticle delay={0} x="10%" y="20%" />
      <FloatingParticle delay={0.5} x="90%" y="30%" />
      <FloatingParticle delay={1} x="20%" y="70%" />
      <FloatingParticle delay={1.5} x="80%" y="60%" />
      <FloatingParticle delay={2} x="50%" y="15%" />
      <FloatingParticle delay={2.5} x="40%" y="85%" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
        className="relative z-10 text-center max-w-md"
      >
        <div className="relative mx-auto mb-6 sm:mb-8 w-32 h-32 sm:w-40 sm:h-40">
          {/* Glowing Center Icon */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400" 
                        strokeWidth={1.5} />
              <motion.div
                className="absolute inset-0 bg-purple-400 rounded-full blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>
          </motion.div>

          {/* Rotating Ring 1 - Fast */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 border-4 border-purple-400/20 border-t-purple-400 
                     rounded-full"
          />

          {/* Rotating Ring 2 - Medium */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-2 border-4 border-pink-400/20 border-b-pink-400 
                     rounded-full"
          />

          {/* Rotating Ring 3 - Slow */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-4 border-4 border-indigo-400/30 border-r-indigo-400 
                     rounded-full"
          />

          {/* Orbiting Stars */}
          <OrbitingStar delay={0} duration={4} radius={60} />
          <OrbitingStar delay={1} duration={5} radius={70} />
          <OrbitingStar delay={2} duration={6} radius={55} />
        </div>

        {/* Text Content - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #fff, #a855f7, #ec4899, #fff)',
              backgroundSize: '200% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Mon Etoile
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-purple-200 font-medium"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            Consultation des astres en cours...
          </motion.p>

          {/* Loading Progress Dots */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading Steps - Animated Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 sm:mt-10 space-y-2"
        >
          {[
            { icon: '🌙', text: 'Analyse des phases lunaires', delay: 0 },
            { icon: '⭐', text: 'Calcul des positions planétaires', delay: 0.3 },
            { icon: '✨', text: 'Préparation de votre guidance', delay: 0.6 }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: step.delay,
                duration: 0.5,
                type: 'spring',
                stiffness: 300
              }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-purple-300"
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: step.delay
                }}
              >
                {step.icon}
              </motion.span>
              <span>{step.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const LoadingFallback = memo(LoadingFallbackComponent, () => true);