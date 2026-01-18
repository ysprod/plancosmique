'use client';
import { memo, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { CategorieAdmin, User } from '@/lib/interfaces';
import CategoryStepNavigation from './CategoryStepNavigation';
import CategoryContextBanner from './CategoryContextBanner';
import ConsultationForm from '../vie-personnelle/ConsultationForm';
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { mapFormDataToBackend } from '@/lib/functions';
import Slide4SectionLoadingOverlay from '../vie-personnelle/Slide4SectionLoadingOverlay';
import Slide4SectionErrorToast from '../vie-personnelle/Slide4SectionErrorToast';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

interface CategoryFormClientProps {
  category: CategorieAdmin;
}

const CategoryFormClient = memo<CategoryFormClientProps>(function CategoryFormClient({ category }) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [contextInfo, setContextInfo] = useState<{ rubrique?: any; choix?: any }>({});
  const [needsForm, setNeedsForm] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  
  const [form, setForm] = useState({
    nom: '',
    prenoms: '',
    gender: '',
    dateNaissance: '',
    heureNaissance: '',
    villeNaissance: '',
    paysNaissance: '',
    question: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
    const rubriqueId = sessionStorage.getItem('rubriqueId');
    
    if (!selectedChoiceId) {
      router.push(`/secured/category/${category._id}/selection`);
      return;
    }
    
    // Load context info and check if form is needed
    const initializeData = async () => {
      try {
        setLoading(true);
        const rubrique = category.rubriques?.find((r: any) => r._id === rubriqueId);
        const choix = rubrique?.consultationChoices?.find((c: any) => c._id === selectedChoiceId);
        setContextInfo({ rubrique, choix });
        
        // Load user data
        const userRes = await api.get('/users/me');
        const currentUser = userRes.data;
        setUserData(currentUser);
        
        // Check if this choice requires a form (AVEC_TIERS)
        const requiresForm = choix?.participants === 'AVEC_TIERS';
        setNeedsForm(requiresForm);
        
        console.log('🔍 Choice participants:', choix?.participants);
        console.log('📋 Requires form:', requiresForm);
        
        // If no form needed, create consultation directly with user data
        if (!requiresForm && currentUser) {
          console.log('⚡ Creating consultation automatically with user data...');
          await createConsultationWithUserData(choix, currentUser, selectedChoiceId);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing:', error);
        setApiError('Erreur lors du chargement des données');
        setShowErrorToast(true);
        setLoading(false);
      }
    };
    
    initializeData();
  }, [category._id, category.rubriques, router]);

  const createConsultationWithUserData = useCallback(async (choix: any, currentUser: User, selectedChoiceId: string) => {
    try {
      const mappedFormData = mapFormDataToBackend(currentUser);
      
      const payload = {
        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
        type: category?.typeconsultation,
        title: choix.title || 'Consultation',
        formData: mappedFormData,
        description: choix.description || '',
        status: 'PENDING',
        alternatives: choix.offering?.alternatives || [],
        choice: choix,
      };
      
      console.log('📤 Sending payload with user data:', payload);
      
      const response = await api.post('/consultations', payload);
      const id = response.data?.id || response.data?.consultationId || response.data?._id;
      
      if (id) {
        console.log('✅ Consultation created with ID:', id);
        sessionStorage.removeItem('selectedChoiceId');
        router.push(`/secured/category/${category._id}/consulter?consultationId=${id}`);
      } else {
        throw new Error('ID de consultation manquant');
      }
    } catch (error: any) {
      console.error('❌ Error creating consultation:', error);
      setApiError(error.response?.data?.message || error.message || 'Erreur lors de la création');
      setShowErrorToast(true);
      setLoading(false);
    }
  }, [category, router]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (!form.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!form.prenoms.trim()) newErrors.prenoms = 'Le prénom est requis';
    if (!form.gender) newErrors.gender = 'Le genre est requis';
    if (!form.dateNaissance) newErrors.dateNaissance = 'La date de naissance est requise';
    if (!form.heureNaissance) newErrors.heureNaissance = "L'heure de naissance est requise";
    if (!form.villeNaissance.trim()) newErrors.villeNaissance = 'La ville de naissance est requise';
    if (!form.paysNaissance.trim()) newErrors.paysNaissance = 'Le pays de naissance est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 Form submitted with data:', form);
    console.log('🔍 Validation errors before check:', errors);
    
    if (!validateForm()) {
      console.log('❌ Validation failed with errors:', errors);
      setApiError('Veuillez remplir tous les champs requis');
      setShowErrorToast(true);
      return;
    }
    
    const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
    
    if (!selectedChoiceId) {
      console.log('❌ No choice selected in sessionStorage');
      setApiError('Aucun choix sélectionné');
      setShowErrorToast(true);
      return;
    }
    
    if (!userData) {
      setApiError('Chargement des données utilisateur en cours, veuillez patienter.');
      setShowErrorToast(true);
      return;
    }
    
    console.log('✅ Validation passed, creating consultation...');
    
    setLoading(true);
    setApiError(null);
    
    try {
      // Get the selected choice
      const rubriqueId = sessionStorage.getItem('rubriqueId');
      const rubrique = category.rubriques?.find((r: any) => r._id === rubriqueId);
      const selectedChoice = rubrique?.consultationChoices?.find((c: any) => c._id === selectedChoiceId);
      
      if (!selectedChoice) {
        throw new Error('Choix de consultation introuvable');
      }
      
      console.log('📦 Selected choice:', selectedChoice);
      
      // Pour AVEC_TIERS : formData = user connecté, tierce = form saisi
      const mappedFormData = mapFormDataToBackend(userData);
      
      const payload = {
        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
        type: category?.typeconsultation,
        title: selectedChoice.title || 'Consultation',
        formData: mappedFormData,
        tierce: form, // Les données de la personne tierce
        description: selectedChoice.description || '',
        status: 'PENDING',
        alternatives: selectedChoice.offering?.alternatives || [],
        choice: selectedChoice,
      };
      
      console.log('📤 Sending payload:', payload);
      
      const response = await api.post('/consultations', payload);
      
      const id = response.data?.id || response.data?.consultationId || response.data?._id;
      if (id) {
        console.log('✅ Consultation created with ID:', id);
        // Clear session storage
        sessionStorage.removeItem('selectedChoiceId');
        
        // Navigate to consulter page
        router.push(`/secured/category/${category._id}/consulter?consultationId=${id}`);
      } else {
        throw new Error('ID de consultation manquant dans la réponse');
      }
    } catch (error: any) {
      console.error('❌ Error creating consultation:', error);
      console.error('❌ Error response:', error.response?.data);
      setApiError(error.response?.data?.message || error.message || 'Erreur lors de la création de la consultation');
      setShowErrorToast(true);
    } finally {
      setLoading(false);
    }
  }, [form, validateForm, category, userData, router]);

  const handleReset = useCallback(() => {
    router.push(`/secured/category/${category._id}/selection`);
  }, [category._id, router]);

  const handleCloseError = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <CategoryStepNavigation 
          categoryId={category._id} 
          currentStep="form"
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent">
              {category.titre || category.nom}
            </h1>
          </div>
          
          <CategoryContextBanner
            rubriqueTitre={contextInfo.rubrique?.titre}
            choixTitre={contextInfo.choix?.titre}
            choixDescription={contextInfo.choix?.description}
          />
          
          {needsForm && !loading && (
            <motion.div className="mt-6">
              <ConsultationForm
                form={form}
                errors={errors}
                handleChange={handleChange}
                apiError={apiError}
                handleSubmit={handleSubmit}
                resetSelection={handleReset}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <Slide4SectionErrorToast 
        showErrorToast={showErrorToast} 
        apiError={apiError} 
        handleCloseError={handleCloseError} 
      />
      <Slide4SectionLoadingOverlay 
        paymentLoading={loading} 
        step={needsForm ? "form" : "consulter"} 
      />
    </div>
  );
});

export default CategoryFormClient;
