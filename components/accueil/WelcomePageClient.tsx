'use client';
import { memo } from 'react';
import PortalHomePage from '@/components/accueil/PortalHomePage';

function WelcomePageClient() {
  return <PortalHomePage />;
}

export default memo(WelcomePageClient);