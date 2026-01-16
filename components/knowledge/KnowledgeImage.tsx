'use client';
import React from 'react';
import Image from 'next/image';

const KnowledgeImage: React.FC<{ imageUrl?: string; title: string }> = ({ imageUrl, title }) => {
  if (!imageUrl) return null;
  return (
    <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden">
      <Image src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  );
};

export default KnowledgeImage;
