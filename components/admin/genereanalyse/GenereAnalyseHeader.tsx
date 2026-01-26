"use client";
import React from "react";
import HeaderBackButton from "./HeaderBackButton";

interface GenereAnalyseHeaderProps {
  onBack: () => void;
}

export const GenereAnalyseHeader: React.FC<GenereAnalyseHeaderProps> = ({
  onBack,
}) => (
  <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
    <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <HeaderBackButton onBack={onBack} />
    </div>
  </div>
);