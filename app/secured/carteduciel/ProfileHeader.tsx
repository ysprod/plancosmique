import { motion } from "framer-motion";
import { Award, Calendar, Clock, MapPin, Phone, User } from "lucide-react";
import { memo } from "react";
import { ProcessedUserData } from "./page";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  })
};

const InfoItem = memo(({
  icon: Icon,
  value,
  iconColor,
  index = 0
}: {
  icon: any;
  value: string;
  iconColor: string;
  index?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-1.5 px-3 py-2 rounded-xl 
             bg-white/5 backdrop-blur-sm border border-white/10
             hover:bg-white/10 transition-all shadow-sm"
  >
    <Icon className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
    <span className="text-xs text-white/90 font-medium truncate">{value}</span>
  </motion.div>
));
InfoItem.displayName = 'InfoItem';

const ProfileHeader = memo(({ userData }: { userData: ProcessedUserData }) => (
  <motion.section
    custom={0}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
             rounded-3xl border border-white/20 p-5 sm:p-6 shadow-2xl 
             relative overflow-hidden"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-blue-600/20"
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: '200% 200%' }}
    />

    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />

    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-4">
      <motion.div
        whileHover={{ scale: 1.08, rotate: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 
                     rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
          <User className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
        </div>
        {userData.premium && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-yellow-500 
                     text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg
                     flex items-center gap-1"
          >
            <Award className="w-3 h-3" />
            Premium
          </motion.div>
        )}
      </motion.div>

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold text-white leading-tight truncate drop-shadow-lg"
        >
          {userData.prenoms} {userData.nom}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-2"
        >
          {userData.phone && (
            <div className="flex items-center gap-1.5 text-xs text-purple-200">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-medium">{userData.phone}</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>

    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2">
      <InfoItem icon={Calendar} value={userData.dateNaissance} iconColor="text-amber-400" index={0} />
      <InfoItem icon={Clock} value={userData.heureNaissance} iconColor="text-blue-400" index={1} />
      <InfoItem icon={MapPin} value={userData.lieuNaissance} iconColor="text-pink-400" index={2} />
    </div>
  </motion.section>
));

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;