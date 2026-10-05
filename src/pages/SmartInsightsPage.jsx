import React, { useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { generateSmartInsights } from '../utils/insightsEngine';
import { Button } from '../components/common/Button';
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Info,
  Sparkles
} from 'lucide-react';

export const SmartInsightsPage = () => {
  const { subjects, tasks, exams, sessions, notes, setActivePage } = useStudy();

  const insights = useMemo(() => {
    return generateSmartInsights({
      subjects,
      tasks,
      exams,
      sessions,
      notes
    });
  }, [subjects, tasks, exams, sessions, notes]);

  const getInsightIcon = (type) => {
    switch (type) {
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return Clock;
      case 'attention':
        return BookOpen;
      case 'success':
        return CheckCircle2;
      default:
        return Lightbulb;
    }
  };

  const getInsightColors = (type) => {
    switch (type) {
      case 'critical':
        return {
          border: 'border-red-300 dark:border-red-900',
          bg: 'bg-red-50/40 dark:bg-red-950/20',
          iconBg: 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400',
          badge: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
        };
      case 'warning':
        return {
          border: 'border-amber-300 dark:border-amber-900',
          bg: 'bg-amber-50/40 dark:bg-amber-950/20',
          iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
          badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
        };
      case 'attention':
        return {
          border: 'border-rose-200 dark:border-rose-900',
          bg: 'bg-rose-50/30 dark:bg-rose-950/20',
          iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400',
          badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
        };
      case 'success':
        return {
          border: 'border-emerald-200 dark:border-emerald-900',
          bg: 'bg-emerald-50/30 dark:bg-emerald-950/20',
          iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
          badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
        };
      default:
        return {
          border: 'border-slate-200 dark:border-slate-800',
          bg: 'bg-white dark:bg-slate-900',
          iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
          badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
        };
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-red-600" />
          Smart Study Insights & Heuristics
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Algorithmic analysis of your deadlines, low-progress subjects, and logged study sessions
        </p>
      </div>

      {/* Methodology Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card flex items-start gap-3">
        <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 flex-shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-white">
            Data-Driven Academic Recommendations:
          </span>{' '}
          These insights are calculated directly from your current stored tasks, syllabus percentages, and study history.
          No synthetic black-box claims—just clear, actionable academic guidance to keep your semester on track.
        </div>
      </div>

      {/* Insights Cards List */}
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const styling = getInsightColors(insight.type);

          return (
            <div
              key={insight.id}
              className={`p-5 rounded-2xl border ${styling.border} ${styling.bg} shadow-card transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${styling.iconBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${styling.badge}`}
                    >
                      {insight.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {insight.message}
                  </p>
                </div>
              </div>

              {insight.actionLabel && insight.actionPage && (
                <Button
                  size="sm"
                  variant="primary"
                  icon={ArrowRight}
                  onClick={() => setActivePage(insight.actionPage)}
                  className="flex-shrink-0 self-end sm:self-center"
                >
                  {insight.actionLabel}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
