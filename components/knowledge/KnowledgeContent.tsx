import React from 'react';

const KnowledgeContent: React.FC<{ content: string }> = ({ content }) => (
  <div className="prose prose-invert prose-lg max-w-none">
    <div
      className="text-gray-300 leading-relaxed whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
    />
  </div>
);

export default KnowledgeContent;