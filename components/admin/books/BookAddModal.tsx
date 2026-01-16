'use client';
import BookAddModalHeader from './BookAddModalHeader';
import BookAddModalStep1 from './BookAddModalStep1';
import BookAddModalStep2 from './BookAddModalStep2';
import { motion } from 'framer-motion';

interface BookAddModalProps {
  show: boolean;
  onClose: () => void;
  currentStep: number;
  formData: any;
  setFormData: (data: any) => void;
  formErrors: Partial<any>;
  submitting: boolean;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleAddBook: (e: React.FormEvent) => void;
  categories: string[];
}

export const BookAddModal: React.FC<BookAddModalProps> = ({
  show,
  onClose,
  currentStep,
  formData,
  setFormData,
  formErrors,
  submitting,
  handleNextStep,
  handlePrevStep,
  handleAddBook,
  categories,
}) => {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-1 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-4 max-w-2xl w-full my-8"
        onClick={e => e.stopPropagation()}
      >
        <BookAddModalHeader currentStep={currentStep} onClose={onClose} submitting={submitting} />
        <form onSubmit={handleAddBook}>
          {currentStep === 1 && (
            <BookAddModalStep1
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              submitting={submitting}
              handleNextStep={handleNextStep}
            />
          )}
          {currentStep === 2 && (
            <BookAddModalStep2
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              submitting={submitting}
              handlePrevStep={handlePrevStep}
              categories={categories}
            />
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};
