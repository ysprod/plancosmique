'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <motion.p
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-red-600 text-sm mt-1 flex items-center gap-1"
  >
    <AlertCircle className="w-4 h-4" />
    {message}
  </motion.p>
);

const InputField: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}> = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
  <div>
    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border-2 rounded-xl px-4 py-3 transition-all ${
        error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
      } focus:outline-none focus:ring-2 focus:ring-purple-500/10`}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

export default InputField;
