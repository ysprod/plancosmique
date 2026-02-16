'use client';

import React, { memo } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const ContactInfo = memo(() => (
    <section className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Contact
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-3">
            Pour toute question sur ces conditions :
        </p>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <a href="mailto:contact@monetoile.fr"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    contact@monetoile.org
                </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <a href="tel:+33123456789"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    +225 07 58 38 53 87
                </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                    OFFOLOMOU, Abidjan, Côte d'Ivoire
                </span>
            </div>
        </div>
    </section>
));
ContactInfo.displayName = 'ContactInfo';

export default ContactInfo;