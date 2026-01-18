'use client';
import React, { memo } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  error?: string;
  placeholder: string;
  icon: React.ElementType;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInputField = memo<InputFieldProps>(({
  label,
  name,
  type,
  value,
  error,
  placeholder,
  icon: Icon,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  onChange
}) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full pl-10 ${showPasswordToggle ? 'pr-10' : 'pr-4'} py-2.5 
            text-sm
            border-2 rounded-xl 
            bg-white dark:bg-gray-800
            transition-all duration-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            ${error
              ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500'
              : 'border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500'
            }
            focus:outline-none focus:ring-2 focus:ring-purple-500/20
          `}
          autoComplete={name === 'username' ? 'username' : 'current-password'}
        />

        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                     text-gray-400 dark:text-gray-500 
                     hover:text-gray-600 dark:hover:text-gray-300
                     transition-colors p-1"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 dark:text-red-400 text-xs mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

LoginInputField.displayName = 'LoginInputField';

export default LoginInputField;