'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { memo } from 'react';

const CosmicLoader = memo(() => (
	<div className=" bg-gradient-to-br from-purple-900 via-indigo-950 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
		{/* ...existing code from loader... */}
		<div className="absolute inset-0 -z-10">
			{/* Orbs and particles omitted for brevity, copy from page.tsx if needed */}
		</div>
		<motion.div
			className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 max-w-md w-full text-center border border-white/20 shadow-2xl"
		>
			<div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6">
				{/* Spinner and icons omitted for brevity, copy from page.tsx if needed */}
				<Star className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
			</div>
			<motion.h2 className="text-xl sm:text-2xl font-black tracking-tight mb-3">Chargement de votre analyse</motion.h2>
			<motion.p className="text-sm sm:text-base text-purple-200 mb-4">Préparation de votre thème natal complet...</motion.p>
		</motion.div>
	</div>
));

export default CosmicLoader;
