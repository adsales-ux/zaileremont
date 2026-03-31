import React from 'react';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  label?: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  layout?: 'vertical' | 'horizontal';
}

export default function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  layout = 'vertical',
  className = '',
  ...props
}: RadioGroupProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <fieldset className={`space-y-3 ${className}`} {...props}>
      {label && (
        <legend className="block text-sm font-medium text-slate-700">
          {label}
        </legend>
      )}

      <div
        className={`space-y-3 ${
          isHorizontal ? 'flex flex-wrap gap-4' : ''
        }`}
      >
        {options.map((option) => (
          <div key={option.value} className={isHorizontal ? 'flex-1 min-w-max' : ''}>
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all ${
                value === option.value
                  ? 'border-brand-blue bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                className="mt-1 h-4 w-4 cursor-pointer accent-brand-blue"
              />

              <div className="flex flex-1 items-start gap-2">
                {option.icon && (
                  <div className="mt-0.5 flex-shrink-0">{option.icon}</div>
                )}

                <div>
                  <p className="font-medium text-slate-900">
                    {option.label}
                  </p>
                  {option.description && (
                    <p className="mt-0.5 text-sm text-slate-600">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600">{error}</p>
      )}
    </fieldset>
  );
}
