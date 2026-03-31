import React from 'react';

interface NumberInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number | string;
  onChange?: (value: number) => void;
  id?: string;
  className?: string;
  placeholder?: string;
}

export default function NumberInput({
  label,
  helperText,
  error,
  unit,
  className = '',
  id,
  min,
  max,
  step,
  value,
  onChange,
  placeholder,
}: NumberInputProps) {
  const fieldId = id || `number-${Math.random().toString(36).slice(2)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(parseFloat(e.target.value) || 0);
    }
  };

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

      <div className="relative">
        <input
          id={fieldId}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-4 py-2 font-inter text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-brand-blue focus:ring-blue-200'
          } ${unit ? 'pr-12' : ''} ${className}`}
        />

        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
            {unit}
          </span>
        )}
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
