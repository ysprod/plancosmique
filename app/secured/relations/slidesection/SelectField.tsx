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

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: readonly { value: string; label: string }[] | string[];
}> = ({ label, name, value, onChange, error, options }) => (
  <div>
    <label className="block text-sm font-bold text-gray-900 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border-2 rounded-xl px-4 py-3 transition-all ${
        error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
      } focus:outline-none focus:ring-2 focus:ring-purple-500/10`}
    >
      {options.map((opt) =>
        typeof opt === 'string' ? (
          <option key={opt} value={opt}>
            {opt || 'Sélectionner'}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
    {error && <ErrorMessage message={error} />}
  </div>
);

export default SelectField;
