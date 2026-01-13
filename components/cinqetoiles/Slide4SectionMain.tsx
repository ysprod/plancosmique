import { Slide4SectionBackButton } from '@/components/cinqetoiles/Slide4SectionBackButton';
import { Slide4SectionForm } from '@/components/cinqetoiles/Slide4SectionForm';
import { Slide4SectionGold } from '@/components/cinqetoiles/Slide4SectionGold';
import { Slide4SectionProcessing } from '@/components/cinqetoiles/Slide4SectionProcessing';
import { Slide4SectionSelection } from '@/components/cinqetoiles/Slide4SectionSelection';
import { containerVariants, fadeVariants, itemVariants } from '@/components/cinqetoiles/slide4SectionVariants';
import { useCinqEtoilesSlide4Section } from '@/hooks/cinqetoiles/useCinqEtoilesSlide4Section';
import { AnimatePresence, motion } from 'framer-motion';
 
export default function Slide4SectionMain() {
  const {
    selected,
    form,
    errors,
    apiError,
    step,
    consultationId,
    paymentLoading,
    walletOfferings,
    consultation,
    choices,
    loading,
    showBackButton,
    handleChange,
    handleSelect,
    resetSelection,
    handleSubmit,
  } = useCinqEtoilesSlide4Section();

  return (
    <>
      
    </>
  );
}
