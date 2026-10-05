import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'red',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-brand transition-all duration-200 relative overflow-hidden group ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      {/* Subtle decorative top-right glow */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-red-500/5 rounded-full blur-xl group-hover:bg-red-500/10 transition-colors pointer-events-none" />

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </p>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-100 dark:border-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        {trend && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
};
