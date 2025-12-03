import React from 'react';

interface AspectHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  introduction: string;
}

const AspectHeader: React.FC<AspectHeaderProps> = ({ icon, title, description, introduction }) => (
  <>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
        {icon}
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic mb-4">
      {description}
    </p>
    <p className="text-gray-600 leading-relaxed">
      {introduction}
    </p>
  </>
);

export default AspectHeader;
