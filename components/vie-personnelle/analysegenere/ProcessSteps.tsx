import { memo } from 'react';
import { User, Sparkles, Mail } from 'lucide-react';
import InfoCard from './InfoCard';

const ProcessSteps = memo(() => (
  <div 
    className="space-y-3 sm:space-y-3.5"
    role="list"
    aria-label="Étapes du processus de consultation"
  >
    <div role="listitem">
      <InfoCard
        icon={User}
        title="Attribution au Maître"
        description="Votre consultation est assignée à un expert qualifié selon votre type de demande."
        delay={0}
        gradient="from-indigo-500 via-blue-500 to-cyan-500"
      />
    </div>
    <div role="listitem">
      <InfoCard
        icon={Sparkles}
        title="Analyse en cours"
        description="Le Maître procède à une étude approfondie et personnalisée de votre situation."
        delay={0}
        gradient="from-purple-500 via-fuchsia-500 to-pink-500"
      />
    </div>
    <div role="listitem">
      <InfoCard
        icon={Mail}
        title="Résultats garantis"
        description="Vous recevrez les résultats détaillés dans un délai maximum d'une heure."
        delay={0}
        gradient="from-emerald-500 via-green-500 to-teal-500"
      />
    </div>
  </div>
));

ProcessSteps.displayName = 'ProcessSteps';

export default ProcessSteps;
