/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  User, 
  Bell,
  Mail
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';

const SuccessIcon = memo(() => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ 
      type: "spring", 
      stiffness: 200, 
      damping: 15,
      delay: 0.1 
    }}
    className="relative mx-auto mb-6"
  >
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 
                    flex items-center justify-center shadow-2xl">
      <CheckCircle2 className="w-12 h-12 text-white" />
    </div>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 
                 flex items-center justify-center shadow-lg"
    >
      <Sparkles className="w-5 h-5 text-yellow-900" />
    </motion.div>
  </motion.div>
));
SuccessIcon.displayName = 'SuccessIcon';

const InfoCard = memo(({ 
  icon: Icon, 
  title, 
  description,
  delay = 0 
}: { 
  icon: any; 
  title: string; 
  description: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 
               border border-gray-200 dark:border-gray-700 backdrop-blur-sm
               hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 
                    flex items-center justify-center shadow-md">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">
        {title}
      </h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
));
InfoCard.displayName = 'InfoCard';

const TimelineBadge = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 0.4 }}
    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full 
               bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg"
  >
    <Clock className="w-4 h-4 text-white" />
    <span className="text-sm font-bold text-white">
      Délai maximum : 1 heure
    </span>
  </motion.div>
));
TimelineBadge.displayName = 'TimelineBadge';
 
export default function AnalyseGenere() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push('/secured/consultations');
  }, [router]);

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      
     

      {/* Contenu principal */}
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 
                   dark:border-gray-700 p-6 sm:p-8 space-y-6"
        >
          
          {/* Icône succès */}
          <SuccessIcon />

          {/* Titre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Félicitations !
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Votre demande a bien été enregistrée
            </p>
          </motion.div>

          {/* Badge timeline */}
          <div className="flex justify-center">
            <TimelineBadge />
          </div>


          {/* Message principal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 \
                     dark:from-purple-900/20 dark:to-pink-900/20 \
                     border border-purple-200 dark:border-purple-800"
          >
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              Nous transmettons actuellement votre requête de consultation à un{' '}
              <strong className="text-purple-700 dark:text-purple-300">
                Maître spirituel qualifié
              </strong>{' '}
              et disponible, qui procédera à l'étude de votre situation avec attention et discernement.
            </p>
          </motion.div>

          {/* Garantie confidentialité */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center"
          >
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
              <strong>Confidentialité garantie :</strong> Toutes vos informations et demandes sont strictement confidentielles et protégées. Elles ne seront jamais partagées avec des tiers.
            </p>
          </motion.div>

          {/* Cards informatives */}
          <div className="space-y-3">
            <InfoCard
              icon={User}
              title="Attribution au Maître"
              description="Votre consultation est assignée à un expert qualifié selon votre type de demande."
              delay={0.4}
            />
            <InfoCard
              icon={Sparkles}
              title="Analyse en cours"
              description="Le Maître procède à une étude approfondie et personnalisée de votre situation."
              delay={0.5}
            />
            <InfoCard
              icon={Mail}
              title="Résultats garantis"
              description="Vous recevrez les résultats détaillés dans un délai maximum d'une heure."
              delay={0.6}
            />
          </div>

         

          {/* Footer message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-center text-gray-500 dark:text-gray-400 pt-4 border-t 
                     border-gray-200 dark:border-gray-700"
          >
            Nous vous remercions pour votre confiance. 🙏
          </motion.p>

           {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <button
              onClick={handleBack}
              className="flex-1 h-11 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-300 font-semibold text-sm
                       hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors
                       active:scale-[0.98]"
            >
              Retour aux consultations
            </button>
           
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
