import { useAuth } from '@/lib/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState, useTransition } from 'react';

export interface FormData {
  username: string;
  password: string;
}

export interface FormErrors {
  username?: string;
  password?: string;
}

const MIN_PASSWORD_LENGTH = 6;

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.username.trim()) {
    errors.username = 'Nom d\'utilisateur requis';
  }
  
  if (!data.password) {
    errors.password = 'Mot de passe requis';
  } else if (data.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Au moins ${MIN_PASSWORD_LENGTH} caractères`;
  }

  return errors;
};

export function useLoginForm() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const returnTo = useMemo(() => {
    const param = searchParams?.get('returnTo');
    if (!param || !param.startsWith('/')) return '/star/profil';
    return param;
  }, [searchParams]);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Synchronise le state avec les valeurs auto-remplies au montage
  // (à placer dans le composant principal via useEffect si besoin)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name as keyof FormErrors]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name as keyof FormErrors];
      return newErrors;
    });
    setError(null);
  }, []);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await login(formData);
      startTransition(() => {
        window.location.href = returnTo;
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Nom d\'utilisateur ou mot de passe incorrect'
      );
    }
  }, [formData, login, returnTo, router]);

  const isSubmitDisabled = useMemo(() => {
    return isLoading || isPending || !formData.username.trim() || !formData.password;
  }, [isLoading, isPending, formData.username, formData.password]);

  return {
    showPassword,
    error,
    formData,
    errors,
    isSubmitDisabled,
    handleChange,
    togglePassword,
    handleSubmit,
    isLoading,
    isPending,
  };
}
