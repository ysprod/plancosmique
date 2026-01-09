import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { memo } from 'react';
import { formatDate } from '@/lib/functions';

interface SubjectHeaderProps {
	sujet: {
		prenoms: string;
		nom: string;
		dateNaissance: string;
		heureNaissance: string;
		lieuNaissance: string;
	};
}

const SubjectHeader = memo<SubjectHeaderProps>(({ sujet }) => (
	<motion.div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/20 mb-6 sm:mb-8">
		<div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
			<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
				<User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
			</div>
			<div>
				<h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">{sujet.prenoms} {sujet.nom}</h2>
			</div>
		</div>
		<div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
			<div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 sm:p-4">
				<Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 flex-shrink-0" />
				<div className="min-w-0">
					<p className="text-xs text-purple-300">Date de naissance</p>
					<p className="text-sm sm:text-base text-white font-semibold truncate">{formatDate(sujet.dateNaissance)}</p>
				</div>
			</div>
			<div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 sm:p-4">
				<Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 flex-shrink-0" />
				<div className="min-w-0">
					<p className="text-xs text-purple-300">Heure de naissance</p>
					<p className="text-sm sm:text-base text-white font-semibold">{sujet.heureNaissance}</p>
				</div>
			</div>
			<div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 sm:p-4">
				<MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
				<div className="min-w-0">
					<p className="text-xs text-purple-300">Lieu</p>
					<p className="text-sm sm:text-base text-white font-semibold truncate">{sujet.lieuNaissance}</p>
				</div>
			</div>
		</div>
	</motion.div>
));

export default SubjectHeader;
