'use client';
import React from 'react';
import { Tag } from 'lucide-react';

const KnowledgeTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mb-8">
    {tags.map((tag, i) => (
      <span
        key={i}
        className="px-3 py-1 rounded-lg text-sm bg-white/10 text-gray-300 flex items-center gap-1"
      >
        <Tag className="w-4 h-4" /> {tag}
      </span>
    ))}
  </div>
);

export default KnowledgeTags;