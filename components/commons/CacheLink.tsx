'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';

interface CacheLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * Composant wrapper pour <Link> qui ajoute automatiquement le cache-busting
 * côté client après hydration pour éviter les mismatches.
 * 
 * Si l'URL contient déjà un paramètre '?', il ajoute '&r=${Date.now()}'
 * Sinon, il ajoute '?r=${Date.now()}'
 */
export default function CacheLink({ href, children, className, ...props }: CacheLinkProps) {
  const [finalHref, setFinalHref] = useState(href);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ajouter le cache-busting côté client APRÈS l'hydration
    const cacheBustedHref = href.includes('?')
      ? `${href}&r=${Date.now()}`
      : `${href}?r=${Date.now()}`;
    setFinalHref(cacheBustedHref);
    setIsHydrated(true);
  }, [href]);

  // Pendant l'hydration, utiliser l'URL original (sans cache-busting)
  // pour éviter la mismatch
  return (
    <Link href={isHydrated ? finalHref : href} className={className} {...props}>
      {children}
    </Link>
  );
}
