import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  hover = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'bg-white rounded-lg border border-slate-200 shadow-sm-card';
  const hoverStyles = hover ? 'transition-all duration-200 hover:shadow-md-card hover:border-slate-300 cursor-pointer' : '';

  const combinedClassName = `${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
