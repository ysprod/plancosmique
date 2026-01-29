import { Grade, GRADE_MESSAGES, getGradeName, calculateProgress, getGradeLevel } from '@/lib/types/grade.types';
import { UserType } from '@/lib/types/user-profile.types';
import { User } from '@/lib/interfaces';
import React from 'react';

export function ProfilWelcomeMessage({ user }: { user: User }) {
  const prenom = user?.prenoms || user?.username || '';
  const grade = user?.grade || null;
  const level = getGradeLevel(grade);
  const message =
    level === 1
      ? GRADE_MESSAGES[Grade.ASPIRANT].welcome.replace(/Votre étoile/g, `Votre étoile, ${prenom || 'Cher(e) utilisateur'}`)
      : '';
  if (!message) return null;
  return (
    <div className="mb-2 p-4">
      <p className="text-base sm:text-lg text-gray-800 dark:text-gray-100 whitespace-pre-line text-center">
        {message}
      </p>
    </div>
  );
}

export function ProfilGradeCongrats({ user }: { user: User }) {
  const prenom = user?.prenoms || user?.username || '';
  const grade = user?.grade || null;
  const level = getGradeLevel(grade);
  if (!grade || level < 1) return null;
  const congrats = GRADE_MESSAGES[grade]?.congratulations?.replace(/Cher\(e\) X/g, `Cher(e) ${prenom}`) || '';
  if (!congrats) return null;
  return (
    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900/80 dark:to-purple-900/60 shadow-lg animate-fade-in">
      <p className="text-base sm:text-lg text-purple-900 dark:text-purple-100 whitespace-pre-line text-center">
        {congrats}
      </p>
    </div>
  );
}

export function ProfilProgressTable({ user }: { user: User }) {
  const progress = calculateProgress(
    user?.consultationsCompleted || 0,
    user?.rituelsCompleted || 0,
    user?.booksRead || 0
  );
  const next = progress.progressToNextGrade;
  if (!next) return null;
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow p-4">
        <h3 className="text-center text-sm font-bold text-purple-700 dark:text-purple-200 mb-2">Progression vers le prochain grade</h3>
        <div className="flex flex-col gap-2">
          <ProgressBar label="Consultations" value={next.consultations.current} max={next.consultations.required} />
          <ProgressBar label="Rituels" value={next.rituels.current} max={next.rituels.required} />
          <ProgressBar label="Livres" value={next.livres.current} max={next.livres.required} />
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>{value} / {max}</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-700 dark:to-indigo-700 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function ProfilUserTypeBanner({ user }: { user: User }) {
  let label = 'Utilisateur Basique';
  let desc = 'Accès aux contenus gratuits et consultations à l’unité.';
  if (user.userType === UserType.PREMIUM) {
    label = 'Utilisateur Premium';
    desc = `Accès illimité à la rubrique sélectionnée pendant 1 an.`;
    if (user.subscriptionEndDate) desc += `\nFin : ${new Date(user.subscriptionEndDate).toLocaleDateString('fr-FR')}`;
  } else if (user.userType === UserType.INTEGRAL) {
    label = 'Utilisateur Intégral';
    desc = `Accès illimité à toutes les rubriques pendant 1 an.`;
    if (user.subscriptionEndDate) desc += `\nFin : ${new Date(user.subscriptionEndDate).toLocaleDateString('fr-FR')}`;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 dark:from-gray-900/80 dark:to-purple-900/60 rounded-xl shadow p-4 animate-fade-in">
        <div className="text-center text-base font-bold text-indigo-800 dark:text-indigo-200 mb-1">{label}</div>
        <div className="text-center text-xs text-gray-700 dark:text-gray-300 whitespace-pre-line">{desc}</div>
      </div>
    </div>
  );
}
