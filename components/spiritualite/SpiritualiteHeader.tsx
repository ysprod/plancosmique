'use client';

import ContentWrapper from '@/components/spiritualite/ContentWrapper';

export default function SpiritualiteHeader() {
  return (
    <ContentWrapper>
      <header className="mb-8 text-center sm:mb-12">
        <h1 className="mb-3 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
          Blog Spiritualité
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">
          Explorez nos articles, pratiques et enseignements spirituels
        </p>
      </header>
    </ContentWrapper>
  );
}
