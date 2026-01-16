'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

interface FloatingParticleProps {
	x: string;
	y: string;
	delay: number;
}

const FloatingParticle = memo<FloatingParticleProps>(({ x, y, delay }) => (
	<motion.div
		className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400/40"
		style={{ left: x, top: y }}
		animate={{
			y: [0, -20, 0],
			opacity: [0.2, 0.7, 0.2]
		}}
		transition={{
			duration: 3,
			repeat: Infinity,
			ease: 'easeInOut',
			delay
		}}
	/>
));

FloatingParticle.displayName = 'FloatingParticle';

export default FloatingParticle;
