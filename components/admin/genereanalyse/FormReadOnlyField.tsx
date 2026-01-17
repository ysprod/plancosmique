"use client";

interface FormReadOnlyFieldProps {
  label: string;
  value: string;
  placeholder?: string;
}

export default function FormReadOnlyField({
  label,
  value,
  placeholder,
}: FormReadOnlyFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        placeholder={placeholder}
        readOnly
      />
    </div>
  );
}