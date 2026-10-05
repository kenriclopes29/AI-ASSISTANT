import React from 'react';
import { useStudy } from '../../context/StudyContext';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  CheckSquare,
  FileText,
  Calendar,
  Clock,
  BarChart2,
  Lightbulb,
  Settings,
  GraduationCap
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-assistant', label: 'AI Study Assistant', icon: Sparkles, badge: 'AI' },
  { id: 'subjects', label: 'Subjects', icon: BookOpen },
  { id: 'tasks', label: 'Tasks & Assignments', icon: CheckSquare },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'exams', label: 'Exams & Deadlines', icon: Calendar },
  { id: 'planner', label: 'Study Planner', icon: Clock },
  { id: 'progress', label: 'Progress', icon: BarChart2 },
  { id: 'insights', label: 'Smart Insights', icon: Lightbulb, badge: 'Smart' },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const { activePage, setActivePage, pendingTasks, upcomingExams, settings } = useStudy();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-500/25">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Study<span className="text-red-600">AI</span>
          </h1>
          <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            College Academic Portal
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Main Menu
        </p>
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          let badgeCount = null;
          if (item.id === 'tasks' && pendingTasks.length > 0) {
            badgeCount = pendingTasks.length;
          } else if (item.id === 'exams' && upcomingExams.length > 0) {
            badgeCount = upcomingExams.length;
          }

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left ${
                isActive
                  ? 'bg-red-600 text-white shadow-sm shadow-red-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-red-50/60 dark:hover:bg-slate-800/80 hover:text-red-700 dark:hover:text-red-400'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-white' : 'text-slate-400 group-hover:text-red-600'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-1.5 ml-2">
                {badgeCount !== null && (
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-white text-red-600'
                        : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                    }`}
                  >
                    {badgeCount}
                  </span>
                )}
                {item.badge && (
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-extrabold ${
                      isActive
                        ? 'bg-red-800 text-white'
                        : 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-900/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Student Profile Card Footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <div
          onClick={() => setActivePage('settings')}
          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900 transition-colors cursor-pointer flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold flex items-center justify-center text-xs border border-red-200 dark:border-red-900">
            FY
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
              {settings.studentName || 'College Student'}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {settings.semester || 'B.Sc. IT Sem 1'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
