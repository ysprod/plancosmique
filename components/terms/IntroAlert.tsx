'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import React, { memo } from 'react';

const IntroAlert = memo(() => (
    <div className="mb-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl 
                border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                En utilisant <strong>OFFOLOMOU</strong>, vous acceptez ces conditions.
                Si vous n'êtes pas d'accord, veuillez ne pas utiliser notre plateforme.
            </p>
        </div>
    </div>
));
IntroAlert.displayName = 'IntroAlert';

export default IntroAlert;
