import { useEffect, useRef, useState } from 'react';
import { User } from '@/lib/interfaces';
import { getGradeLevel } from '@/lib/types/grade.types';

export function useGradeToast(user: User | undefined) {
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const prevLevel = useRef<number>(0);

  useEffect(() => {
    if (!user) return;
    const currentLevel = getGradeLevel(user.grade || null);
    if (currentLevel > prevLevel.current) {
      setLevel(currentLevel);
      setShow(true);
      prevLevel.current = currentLevel;
    }
  }, [user?.grade]);

  const close = () => setShow(false);
  return { show, level, close };
}

export function GradeToast({ show, level, close }: { show: boolean; level: number; close: () => void }) {
  if (!show || level < 1) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3">
        <span className="text-2xl">🌟</span>
        <span className="font-bold">Félicitations !</span>
        <span className="ml-2">Vous avez atteint le grade {level}.</span>
        <button onClick={close} className="ml-4 text-white/80 hover:text-white text-lg">&times;</button>
      </div>
    </div>
  );
}
