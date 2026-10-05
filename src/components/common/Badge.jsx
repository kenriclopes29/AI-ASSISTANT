import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const base = 'inline-flex items-center font-medium rounded-full';

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs'
  };

  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    primary: 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900',
    high: 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900 font-semibold',
    medium: 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900',
    low: 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    danger: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
