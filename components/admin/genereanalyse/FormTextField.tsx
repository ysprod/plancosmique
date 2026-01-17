"use client";

interface FormFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
}

export default function FormTextField({
    label,
    value,
    onChange,
    error,
    placeholder,
    required = false,
}: FormFieldProps) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && "*"}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${error
                    ? "border-red-300 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                placeholder={placeholder}
            />
            {error && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
}