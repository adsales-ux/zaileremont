import React from 'react';

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export default function SelectField({
  label,
  helperText,
  error,
  options,
  className = '',
  id,
  ...props
}: SelectFieldProps) {
  const fieldId = id || `select-${Math.random().toString(36).slice(2)}`;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <select
        id={fieldId}
        className={`w-full rounded-lg border px-4 py-2 font-inter text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : 'border-slate-300 focus:border-brand-blue focus:ring-blue-200'
        } ${className}`}
        {...props}
      >
        <option value="">Wybierz opcję</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm font-medium text-red-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
