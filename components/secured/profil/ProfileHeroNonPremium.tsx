"use client";
import { ProfilWelcomeMessage } from "@/components/profil/ProfilAutomatedSections";
import { cx } from "@/lib/functions";
import { User } from "@/lib/interfaces";
import { memo } from "react";

const ProfileHeroNonPremium = memo(function ProfileHeroNonPremium({ user }: { user: User; }) {

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div
        className={cx(
          "relative overflow-hidden rounded-[28px] border mb-4",
          "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
          "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
        )}
      >
        <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />
        <ProfilWelcomeMessage user={user} />
      </div>
    </section>
  );
});

export default ProfileHeroNonPremium;
