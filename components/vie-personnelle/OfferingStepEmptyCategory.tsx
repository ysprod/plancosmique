'use client';

import { Package } from "lucide-react";

export default function OfferingStepEmptyCategory() {
  return (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
        <Package className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Aucune offrande dans cette catégorie
      </p>
    </div>
  );
}
