import { useAuth } from '@/lib/hooks';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { countries } from '@/components/auth/countries';

export interface FormData {
  username: string;
  gender: string;
  country: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  [key: string]: string;
}

const PASSWORD_MIN_LENGTH = 8;

const GENDER_OPTIONS = [
  { value: '', label: 'Sélectionner' },
  { value: 'male', label: 'Homme' },
  { value: 'female', label: 'Femme' },
] as const;

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= PASSWORD_MIN_LENGTH) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return strength;
};

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!formData.username.trim()) {
    errors.username = 'Nom d\'utilisateur requis';
  } else if (formData.username.length < 2) {
    errors.username = 'Au moins 2 caractères requis';
  } else if (/\s/.test(formData.username)) {
    errors.username = 'Le nom d\'utilisateur ne peut pas contenir d\'espaces';
  }
  if (!formData.gender) {
    errors.gender = 'Genre requis';
  }
  if (!formData.country) {
    errors.country = 'Pays requis';
  }
  if (!formData.phone.trim()) {
    errors.phone = 'Numéro de téléphone requis';
  }
  if (!formData.password) {
    errors.password = 'Mot de passe requis';
  } else if (formData.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Au moins ${PASSWORD_MIN_LENGTH} caractères`;
  }
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Confirmation requise';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }
  return errors;
};

export function useRegisterForm() {
  const { register, isLoading } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    gender: 'male',
    country: '',
    phone: '0758385387',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Pour le username, empêcher la saisie d'espaces
      if (name === 'username' && /\s/.test(value)) {
        return; // Bloquer la saisie si elle contient des espaces
      }
      
      if (name === 'password') {
        setPasswordStrength(calculatePasswordStrength(value));
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      setError(null);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      try {
        console.log('Submitting registration with data:', formData);
        await register(formData);
      } catch (err: any) {
        let errorMessage = err.response?.data?.message || "Erreur lors de l'inscription";
        if (err.response?.data?.errors) {
          const details = Object.entries(err.response.data.errors)
            .map(([field, msg]) => `• ${field} : ${msg}`)
            .join('\n');
          errorMessage += '\n' + details;
        }
        setError(errorMessage);
      }
    },
    [formData, register]
  );

  const countryOptions = useMemo(() => ['', ...countries], []);
  const passwordsMatch = useMemo(
    () => formData.password === formData.confirmPassword && formData.confirmPassword !== '',
    [formData.password, formData.confirmPassword]
  );
  const isSubmitDisabled = useMemo(() => {
    return isLoading || isPending;
  }, [isLoading, isPending]);

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    setError,
    passwordStrength,
    formData,
    errors,
    handleChange,
    handleSubmit,
    countryOptions,
    passwordsMatch,
    isSubmitDisabled,
    isLoading,
    isPending,
    GENDER_OPTIONS,
  };
}
