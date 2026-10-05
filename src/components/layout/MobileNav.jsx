import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { NAVIGATION_ITEMS } from './Sidebar';
import {
  X,
  GraduationCap,
  LayoutDashboard,
  Sparkles,
  CheckSquare,
  Clock,
  Lightbulb
} from 'lucide-react';

export const MobileNav = ({ isOpen, onClose }) => {
  const { activePage, setActivePage, pendingTasks, upcomingExams, settings } = useStudy();

  const handleSelect = (id) => {
    setActivePage(id);
    onClose();
  };

  const bottomNavItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'ai-assistant', label: 'AI Chat', icon: Sparkles },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: pendingTasks.length },
    { id: 'planner', label: 'Planner', icon: Clock },
    { id: 'insights', label: 'Insights', icon: Lightbulb }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Slide-out Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-250 ease-in-out lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Study<span className="text-red-600">AI</span>
              </h2>
              <p className="text-[10px] text-slate-400">College Academic Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            let badgeCount = null;
            if (item.id === 'tasks' && pendingTasks.length > 0) badgeCount = pendingTasks.length;
            if (item.id === 'exams' && upcomingExams.length > 0) badgeCount = upcomingExams.length;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-red-50/60 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {badgeCount !== null && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-red-600' : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                    }`}
                  >
                    {badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Drawer Student Info Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
            <p className="font-bold text-slate-800 dark:text-white truncate">
              {settings.studentName}
            </p>
            <p className="text-[11px] text-slate-400 truncate">{settings.college}</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar for Mobile */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30 px-2 py-1 flex justify-around items-center">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center py-1 px-2 relative transition-colors ${
                isActive
                  ? 'text-red-600 font-bold'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
