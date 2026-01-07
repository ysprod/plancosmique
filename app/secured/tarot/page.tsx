'use client';
import TarotComingSoon from '@/components/tarot/TarotComingSoon';
import TarotHeader from '@/components/tarot/TarotHeader';

export default function TarotPage() {
  return (
    <div className="relative  bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        <TarotHeader />   
             
        <TarotComingSoon />
      </div>
    </div>
  );
}