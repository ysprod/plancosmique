import { GRADE_MESSAGES, Grade } from "@/lib/types/grade.types";
import React from "react";

export function GradeMessageDisplay({ grade }: { grade: Grade }) {
  const message = GRADE_MESSAGES[grade]?.welcome || GRADE_MESSAGES[grade]?.congratulations || "";
  if (!message) return null;
  return (
    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 dark:from-gray-900/80 dark:to-purple-900/60 shadow animate-fade-in">
      <p className="text-base sm:text-lg text-gray-800 dark:text-gray-100 whitespace-pre-line text-center">
        {message}
      </p>
    </div>
  );
}