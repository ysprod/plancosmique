import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { CarteDuCielBase } from '@/lib/interfaces';

type CarteDuCielSubjet = CarteDuCielBase['sujet'];

const SubjectCard = memo(({ sujet }: { sujet: CarteDuCielSubjet }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-lg"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-1">
          {sujet.nom} {sujet.prenoms}
        </h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-90">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(sujet.dateNaissance).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {sujet.heureNaissance}
          </div>
        </div>
      </div>
      <Sparkles className="w-8 h-8 opacity-80" />
    </div>
    <div className="flex items-center gap-1 text-xs opacity-90">
      <MapPin className="w-3 h-3" />
      {sujet.lieuNaissance}
    </div>
  </motion.div>
));

SubjectCard.displayName = 'SubjectCard';

export default SubjectCard;