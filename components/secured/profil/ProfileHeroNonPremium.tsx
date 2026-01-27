"use client";
import { InitiatiqueBadge } from "@/components/profil/InitiatiqueBadge";
import { ProfilGradeCongrats, ProfilProgressTable, ProfilUserTypeBanner, ProfilWelcomeMessage } from "@/components/profil/ProfilAutomatedSections";
import { GradeToast } from "@/components/profil/useGradeToast";
import { cx } from "@/lib/functions";
import { memo } from "react";

const ProfileHeroNonPremium = memo(function ProfileHeroNonPremium({
  user,
  showToast,
  toastLevel,
  onCloseToast,
}: {
  user: any;
  showToast: boolean;
  toastLevel: any;
  onCloseToast: () => void;
}) {
  return (
    <section className="mx-auto w-full max-w-3xl">
      <div
        className={cx(
          "relative overflow-hidden rounded-[28px] border",
          "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
          "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
        )}
      >
        <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />
        <div className="p-2 sm:p-4">
          <div className="mx-auto flex flex-col items-center justify-center text-center gap-2">
            <InitiatiqueBadge grade={user?.grade} />

            <div className="mt-2 w-full max-w-xl">
              <ProfilWelcomeMessage user={user} />
              <ProfilGradeCongrats user={user} />
              <ProfilUserTypeBanner user={user} />
            </div>
            <div className="mt-3 w-full max-w-xl">
              <ProfilProgressTable user={user} />
            </div>
          </div>
        </div>
        {/* Toast centré (au-dessus du hero) */}
        <GradeToast show={showToast} level={toastLevel} close={onCloseToast} />
      </div>
    </section>
  );
});

export default ProfileHeroNonPremium;
