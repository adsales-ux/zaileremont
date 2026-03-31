import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'cta';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-blue text-white hover:bg-blue-800 focus:ring-brand-blue',
  secondary:
    'border-2 border-slate-300 text-slate-700 hover:border-brand-blue hover:text-brand-blue focus:ring-brand-blue',
  cta: 'bg-gradient-to-r from-accent-orange to-orange-600 text-white hover:shadow-lg focus:ring-accent-orange',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm font-medium rounded-md',
  md: 'px-4 py-2 text-base font-medium rounded-lg',
  lg: 'px-6 py-3 text-lg font-semibold rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-inter transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
