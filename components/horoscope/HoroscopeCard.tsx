import { motion } from "framer-motion";
import { CheckCircle2, Clock, Calendar, Sparkles } from "lucide-react";
import { memo } from "react";
import { BackendHoroscope } from "../../app/secured/horoscope/page";

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 22
        }
    }
};

interface HoroscopeCardProps {
    horoscope: BackendHoroscope;
    onClick: () => void;
}

const HoroscopeCard = memo<HoroscopeCardProps>(({ horoscope, onClick }) => {
    const isCompleted = horoscope.status === 'COMPLETED';
    const date = new Date(horoscope.completedDate || horoscope.createdAt);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <motion.button
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${isCompleted
                ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 hover:border-purple-400'
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                            <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <h3 className="font-bold text-gray-900 text-sm truncate">
                            {horoscope.title}
                        </h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {horoscope.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
                    </div>
                </div>
                {isCompleted && (
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                    </div>
                )}
            </div>
        </motion.button>
    );
}, (prev, next) => prev.horoscope._id === next.horoscope._id);

HoroscopeCard.displayName = 'HoroscopeCard';

export default HoroscopeCard;