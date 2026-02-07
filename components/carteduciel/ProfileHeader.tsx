"use client";
import { Award, Calendar, Clock, MapPin, Phone, User as UserIcon } from "lucide-react";
import { memo, useMemo } from "react";
import InfoItem from "./InfoItem";
import { User } from "@/lib/interfaces";
import { safeText, formatDateFR } from "@/lib/functions";

const ProfileHeader = memo(function ProfileHeader({ userData }: { userData: User }) {

  const vm = useMemo(() => {
    const prenoms = safeText(userData?.prenoms);
    const nom = safeText(userData?.nom);
    const fullName = (prenoms || nom) ? `${prenoms}${prenoms && nom ? " " : ""}${nom}` : "Profil";

    const premium = !!userData?.premium;

    const dateNaissance = typeof userData?.dateNaissance === 'string' ? userData.dateNaissance : (userData?.dateNaissance ? userData.dateNaissance.toISOString() : '');
    const heureNaissance = safeText(userData?.heureNaissance!);
    const lieuNaissance = safeText(userData?.villeNaissance!);

    return { fullName,  premium, dateNaissance, heureNaissance, lieuNaissance };
  }, [userData]);

  return (
    <section
      className={[
        "w-full max-w-xl rounded-3xl",
        "border border-black/10 dark:border-white/10",
        "bg-white dark:bg-slate-950",
        "shadow-[0_18px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
        "px-4 py-4 sm:px-5 sm:py-5",
        "mx-auto flex flex-col items-center justify-center text-center",
      ].join(" ")}
    >
      {/* Accent bar (statique, ultra clean) */}
      <div
        className={[
          "mx-auto mb-4 h-[3px] w-24 rounded-full",
          vm.premium
            ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400"
            : "bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* Header row : tout centré */}
      <div className="flex flex-col items-center justify-center text-center gap-3 w-full">
        {/* Avatar / Sigil */}
        <div className="relative"        >
          <div
            className={[
              "h-16 w-16 sm:h-20 sm:w-20 rounded-2xl grid place-items-center",
              "bg-slate-100 text-slate-700 border border-black/5",
              "dark:bg-white/5 dark:text-slate-100 dark:border-white/10",
              vm.premium ? "ring-2 ring-amber-400/60" : "ring-1 ring-black/5 dark:ring-white/10",
            ].join(" ")}
          >
            <UserIcon className="h-8 w-8 sm:h-9 sm:w-9" />
          </div>
          <div
            className={[
              "absolute -bottom-2 left-1/2 -translate-x-1/2",
              "inline-flex items-center gap-1.5",
              "rounded-full px-2.5 py-1",
              "text-[10px] font-bold tracking-wide",
              "bg-amber-400 text-amber-950",
              "shadow-md shadow-amber-400/20",
            ].join(" ")}
            aria-label={`Grade utilisateur : ${userData.grade || 'Premium'}`}
            title={`Grade utilisateur : ${userData.grade || 'Premium'}`}
          >
            <Award className="h-3 w-3" />
            {userData.grade || 'Premium'}
          </div>
        </div>

        {/* Nom + contact */}
        <div className="min-w-0 flex flex-col items-center justify-center gap-1">
          <h1 className="text-[16px] sm:text-[18px] font-extrabold tracking-tight text-slate-900 dark:text-slate-50 max-w-[22rem] truncate">
            {vm.fullName}
          </h1>
        </div>
      </div> 
      <div
        className="mt-4 w-full flex justify-center"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-blue-50/60 dark:bg-slate-900/50 p-3 rounded-2xl w-full max-w-2xl mx-auto text-center">
          <InfoItem icon={Calendar} value={formatDateFR(vm.dateNaissance)}   iconColor="text-amber-500" index={0} />
          <InfoItem icon={Clock} value={vm.heureNaissance || "—"} iconColor="text-indigo-500" index={1} />
          <InfoItem icon={MapPin} value={vm.lieuNaissance || "—"} iconColor="text-rose-500" index={2} />
        </div>
      </div>
    </section>
  );
});

ProfileHeader.displayName = "ProfileHeader";

export default ProfileHeader;