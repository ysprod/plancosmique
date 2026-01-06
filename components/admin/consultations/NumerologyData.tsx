import { memo } from 'react';
import { Star, TrendingUp, Globe, Sun, Calendar, Moon, BookOpen, Lightbulb } from 'lucide-react';
import ExpandableSection from './ExpandableSection';

const NumerologyData = memo(({ resultData }: { resultData: any }) => {
  if (!resultData) return null;
  return (
    <div className="space-y-1">
      {/* Thème de Naissance */}
      {resultData.themeDeNaissance && (
        <ExpandableSection
          title="🌟 Thème de Naissance"
          icon={Star}
          iconColor="text-yellow-600"
          content={
            <div className="space-y-2">
              {/* Chemin de Vie */}
              {resultData.themeDeNaissance.cheminDeVie && (
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm">
                      {resultData.themeDeNaissance.cheminDeVie.valeur}
                    </div>
                    <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100">
                      Chemin de Vie
                    </span>
                    {resultData.themeDeNaissance.cheminDeVie.valeur === 22 && (
                      <span className="text-[7px] px-1 py-0.5 rounded-full bg-yellow-400 text-yellow-900 font-bold">
                        MAÎTRE
                      </span>
                    )}
                  </div>
                  <p className="text-[9px] text-gray-700 dark:text-gray-300 leading-relaxed">
                    {resultData.themeDeNaissance.cheminDeVie.interpretation}
                  </p>
                </div>
              )}
              {/* Autres nombres */}
              <div className="grid grid-cols-3 gap-1">
                {resultData.themeDeNaissance.nombreExpression && (
                  <div className="p-1.5 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-center">
                    <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                      {resultData.themeDeNaissance.nombreExpression.valeur}
                    </div>
                    <div className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">
                      Expression
                    </div>
                  </div>
                )}
                {resultData.themeDeNaissance.nombreAme && (
                  <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {resultData.themeDeNaissance.nombreAme.valeur}
                    </div>
                    <div className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">
                      Âme
                    </div>
                  </div>
                )}
                {resultData.themeDeNaissance.nombrePersonnalite && (
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {resultData.themeDeNaissance.nombrePersonnalite.valeur}
                    </div>
                    <div className="text-[8px] font-semibold text-gray-700 dark:text-gray-300">
                      Personnalité
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        />
      )}
      {/* Cycles en Mouvement */}
      {resultData.cyclesEnMouvement && (
        <ExpandableSection
          title="🌊 Cycles en Mouvement"
          icon={TrendingUp}
          iconColor="text-cyan-600"
          content={
            <div className="grid grid-cols-2 gap-2">
              {resultData.cyclesEnMouvement.anneeUniverselle && (
                <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
                  <div className="flex items-center gap-1 mb-1">
                    <Globe className="w-3 h-3 text-cyan-600" />
                    <span className="text-[9px] font-bold text-gray-900 dark:text-gray-100">
                      Année Universelle
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                    {resultData.cyclesEnMouvement.anneeUniverselle.valeur}
                  </div>
                  <p className="text-[8px] text-gray-700 dark:text-gray-300 leading-tight line-clamp-2">
                    {resultData.cyclesEnMouvement.anneeUniverselle.interpretation}
                  </p>
                </div>
              )}
              {resultData.cyclesEnMouvement.anneePersonnelle && (
                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <div className="flex items-center gap-1 mb-1">
                    <Sun className="w-3 h-3 text-orange-600" />
                    <span className="text-[9px] font-bold text-gray-900 dark:text-gray-100">
                      Année Personnelle
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {resultData.cyclesEnMouvement.anneePersonnelle.valeur}
                  </div>
                  {resultData.cyclesEnMouvement.anneePersonnelle.conseil && (
                    <p className="text-[8px] text-amber-700 dark:text-amber-300 leading-tight line-clamp-2 italic">
                      💡 {resultData.cyclesEnMouvement.anneePersonnelle.conseil}
                    </p>
                  )}
                </div>
              )}
              {resultData.cyclesEnMouvement.moisPersonnel && (
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-purple-600" />
                    <span className="text-[9px] font-bold text-gray-900 dark:text-gray-100 capitalize">
                      Mois: {resultData.cyclesEnMouvement.moisPersonnel.mois}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {resultData.cyclesEnMouvement.moisPersonnel.valeur}
                  </div>
                </div>
              )}
              {resultData.cyclesEnMouvement.jourPersonnel && (
                <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-900/20">
                  <div className="flex items-center gap-1 mb-1">
                    <Moon className="w-3 h-3 text-pink-600" />
                    <span className="text-[9px] font-bold text-gray-900 dark:text-gray-100">
                      Aujourd'hui
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {resultData.cyclesEnMouvement.jourPersonnel.valeur}
                  </div>
                </div>
              )}
            </div>
          }
        />
      )}
      {/* Synthèse et Timing */}
      {resultData.syntheseEtTiming && (
        <ExpandableSection
          title="💡 Synthèse & Opportunités"
          icon={Lightbulb}
          iconColor="text-amber-600"
          content={
            <div className="space-y-2 text-[9px] leading-relaxed">
              {resultData.syntheseEtTiming.accord && (
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                    🎯 Accord Énergétique
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {resultData.syntheseEtTiming.accord}
                  </p>
                </div>
              )}
              {resultData.syntheseEtTiming.opportunites && (
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <p className="font-semibold text-green-900 dark:text-green-200 mb-1">
                    ✨ Opportunités
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {resultData.syntheseEtTiming.opportunites}
                  </p>
                </div>
              )}
              {resultData.syntheseEtTiming.conseilsPratiques?.length > 0 && (
                <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                    💡 Conseils Pratiques
                  </p>
                  <ul className="space-y-1">
                    {resultData.syntheseEtTiming.conseilsPratiques.map((conseil: string, i: number) => (
                      <li key={i} className="flex gap-1 text-gray-700 dark:text-gray-300">
                        <span className="font-bold">•</span>
                        <span>{conseil}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          }
        />
      )}
      {/* Sagesse Africaine */}
      {resultData.sagessAfricaine && (
        <ExpandableSection
          title="📖 Sagesse Africaine"
          icon={BookOpen}
          iconColor="text-amber-600"
          content={
            <div className="space-y-2">
              <blockquote className="border-l-4 border-amber-400 pl-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded">
                <p className="text-[10px] italic font-medium text-amber-900 dark:text-amber-200">
                  {resultData.sagessAfricaine.proverbe}
                </p>
                <footer className="text-[8px] text-amber-700 dark:text-amber-300 mt-1">
                  — {resultData.sagessAfricaine.source}
                </footer>
              </blockquote>
              <p className="text-[9px] text-gray-700 dark:text-gray-300 leading-relaxed">
                {resultData.sagessAfricaine.lien}
              </p>
            </div>
          }
        />
      )}
    </div>
  );
});

NumerologyData.displayName = 'NumerologyData';

export default NumerologyData;
