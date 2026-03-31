import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
}

interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  label?: string;
  name: string;
  options: CheckboxOption[];
  values?: string[];
  onChange?: (values: string[]) => void;
  error?: string;
}

export default function CheckboxGroup({
  label,
  name,
  options,
  values = [],
  onChange,
  error,
  className = '',
  ...props
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange?.([...values, optionValue]);
    } else {
      onChange?.(values.filter((v) => v !== optionValue));
    }
  };

  return (
    <fieldset className={`space-y-3 ${className}`} {...props}>
      {label && (
        <legend className="block text-sm font-medium text-slate-700">
          {label}
        </legend>
      )}

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-slate-200 bg-white p-4 transition-all hover:border-slate-300"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={values.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer rounded accent-brand-blue"
            />

            <div className="flex-1">
              <p className="font-medium text-slate-900">
                {option.label}
              </p>
              {option.description && (
                <p className="mt-0.5 text-sm text-slate-600">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600">{error}</p>
      )}
    </fieldset>
  );
}
