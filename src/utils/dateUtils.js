/**
 * Date formatting and calculation utilities
 */

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getDaysRemaining = (targetDateString) => {
  if (!targetDateString) return 0;
  const target = new Date(targetDateString);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export const isOverdue = (dateString, status) => {
  if (status === 'completed' || !dateString) return false;
  return getDaysRemaining(dateString) < 0;
};

export const isDueToday = (dateString) => {
  if (!dateString) return false;
  return getDaysRemaining(dateString) === 0;
};

export const getRelativeDaysBadge = (dateString, status) => {
  if (status === 'completed') {
    return { text: 'Completed', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' };
  }
  const days = getDaysRemaining(dateString);
  if (days < 0) {
    return {
      text: `${Math.abs(days)}d overdue`,
      color: 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-900'
    };
  }
  if (days === 0) {
    return {
      text: 'Due Today',
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
    };
  }
  if (days === 1) {
    return {
      text: 'Due Tomorrow',
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
    };
  }
  if (days <= 7) {
    return {
      text: `In ${days} days`,
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300'
    };
  }
  return {
    text: `In ${days} days`,
    color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
  };
};

export const toInputDateFormat = (date = new Date()) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

export const offsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toInputDateFormat(d);
};
