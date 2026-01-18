'use client';
import ConsulterGoldContent from '@/components/cinqetoiles/ConsulterGoldContent';

export function Slide4SectionGold({ consultationId, walletOfferings, consultation }: any) {
  return (
    <ConsulterGoldContent
      consultationId={consultationId}
      walletOfferings={walletOfferings}
      consultation={consultation}
    />
  );
}