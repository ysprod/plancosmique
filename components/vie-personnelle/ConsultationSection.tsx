import HoroscopeForm from '@/components/horoscope/HoroscopeForm';
import HoroscopeList from '@/components/horoscope/HoroscopeList';
import HoroscopeListLoading from '@/components/horoscope/HoroscopeListLoading';
import HoroscopeTabs from '@/components/horoscope/HoroscopeTabs';
import ResultDisplay from '@/components/horoscope/ResultDisplay';
import { NumerologieConsultationSection } from '@/components/numerologie/NumerologieConsultationSection';
import Slide4Section from '@/components/vie-personnelle/Slide4Section';
import useHoroscopePage from '@/hooks/horoscope/useHoroscopePage';
import { ConsultationChoice, Rubrique, Tab } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';

interface ConsultationSectionProps {
  rubrique: Rubrique;
}

function HoroscopeConsultationSection() {
  const {
    loadingUser, activeTab, result, error, loadingHoroscopes, filteredHoroscopes,
    tabs, handleRedirect, handleTabChange, handleHoroscopeClick
  } = useHoroscopePage();

  const typedTabs = tabs as Tab[];

  return (
    <div className="bg-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-5 sm:py-6 max-w-3xl">

        <HoroscopeTabs tabs={typedTabs} activeTab={activeTab} onTabChange={handleTabChange} />
        <HoroscopeList horoscopes={filteredHoroscopes} activeTab={activeTab} onHoroscopeClick={handleHoroscopeClick} />
        <HoroscopeForm loadingUser={loadingUser} activeTab={activeTab} filteredHoroscopesLength={filteredHoroscopes.length} error={error} onSubmit={handleRedirect} />

        {loadingHoroscopes && <HoroscopeListLoading />}

        {result && !loadingHoroscopes && (
          <ResultDisplay key="result" result={result} />
        )}
      </div>
    </div>
  );
}

export const ConsultationSelection: React.FC<{
  onSelect: (choice: ConsultationChoice) => void;
  title?: string;
  choices: ConsultationChoice[];
  alreadyDoneChoices: string[];
  alreadyDoneConsultationIds?: Record<string, string>;
}> = ({ onSelect, title, choices, alreadyDoneChoices, alreadyDoneConsultationIds }) => (
  <> 
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
    >
      {choices.map((choice, idx) => (
        <ConsultationCard
          key={choice.id || idx}
          choice={choice}
          onSelect={() => onSelect(choice)}
          alreadyDone={alreadyDoneChoices.includes(choice.id)}
          consultationId={alreadyDoneConsultationIds?.[choice.id]}
        />
      ))}
    </motion.div>
  </>
);

export function ConsultationSection({ rubrique }: ConsultationSectionProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key="consultation"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white"
        >
          {rubrique.typeconsultation === 'HOROSCOPE' ? (
            <HoroscopeConsultationSection />
          ) : (rubrique.typeconsultation === 'CYCLES_PERSONNELS' || rubrique.typeconsultation === 'NOMBRES_PERSONNELS') ? (
            <NumerologieConsultationSection rubriqueId={rubrique._id!} typeconsultation={rubrique.typeconsultation} />
          ) : (
            <Slide4Section rubrique={rubrique} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}