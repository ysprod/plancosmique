import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
    cartCount: number;
    cartTotal: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, cartTotal }) => {
    return (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Mon Étoile"
                        width={56}
                        height={56}
                        className="w-12 h-12 sm:w-14 sm:h-14 hover:scale-105 transition-transform"
                        priority
                    />
                </Link>

                <div className="text-center flex-1 px-4">
                    <h1 className="text-base sm:text-lg md:text-xl font-black text-black">
                        MARCHÉ DES OFFRANDES
                    </h1>
                    {cartCount > 0 && (
                        <p className="text-xs text-gray-600 mt-0.5">
                            {cartCount} article{cartCount > 1 ? 's' : ''} · {cartTotal.toLocaleString()} F
                        </p>
                    )}
                </div>

                <div className="w-12 sm:w-14" /> {/* Spacer pour centrer */}
            </div>
        </header>
    );
};
