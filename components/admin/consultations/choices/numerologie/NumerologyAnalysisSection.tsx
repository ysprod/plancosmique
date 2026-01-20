import { motion } from "framer-motion";
import { NumerologyThemeSection } from "./NumerologyThemeSection";
import { NumerologyCyclesSection } from "./NumerologyCyclesSection";
import { NumerologySynthesisSection } from "./NumerologySynthesisSection";
import { NumerologyLifeCyclesSection } from "./NumerologyLifeCyclesSection";
import { NumerologyWisdomSection } from "./NumerologyWisdomSection";

interface NumerologyAnalysisSectionProps {
  themeDeNaissance: any;
  cyclesEnMouvement: any;
  syntheseEtTiming: any;
  cyclesDeVieGrands: any;
  sagesseAfricaine: any;
}

export const NumerologyAnalysisSection: React.FC<NumerologyAnalysisSectionProps> = ({
  themeDeNaissance,
  cyclesEnMouvement,
  syntheseEtTiming,
  cyclesDeVieGrands,
  sagesseAfricaine,
}) => {
  return (
    <motion.section
      className="my-4 p-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-zinc-800 dark:to-zinc-900 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="font-bold text-lg mb-4 text-purple-800 dark:text-purple-300 text-center">
        Analyse Numérologique
      </h3>
      <NumerologyThemeSection themeDeNaissance={themeDeNaissance} />
      <NumerologyCyclesSection cyclesEnMouvement={cyclesEnMouvement} />
      <NumerologySynthesisSection syntheseEtTiming={syntheseEtTiming} />
      <NumerologyLifeCyclesSection cyclesDeVieGrands={cyclesDeVieGrands} />
      <NumerologyWisdomSection sagesseAfricaine={sagesseAfricaine} />
    </motion.section>
  );
}
