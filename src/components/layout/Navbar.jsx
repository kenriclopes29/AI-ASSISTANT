import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import {
  Menu,
  Moon,
  Sun,
  Plus,
  CheckSquare,
  FileText,
  Calendar,
  Clock,
  BookOpen
} from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = ({ onOpenMobileMenu, onQuickAction }) => {
  const { activePage, settings, updateSettings } = useStudy();
  const [showAddMenu, setShowAddMenu] = useState(false);

  const getPageTitle = (page) => {
    switch (page) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'ai-assistant':
        return 'AI Study Assistant (Academic Helper)';
      case 'subjects':
        return 'Subject Management';
      case 'tasks':
        return 'Tasks & Assignments Tracker';
      case 'notes':
        return 'Study Notes & Cheat Sheets';
      case 'exams':
        return 'Exams & Deadlines Tracker';
      case 'planner':
        return 'Study Planner & Session Logger';
      case 'progress':
        return 'Academic Progress & Analytics';
      case 'insights':
        return 'Smart Study Insights';
      case 'settings':
        return 'Settings & Data Management';
      default:
        return 'AI Study Assistant';
    }
  };

  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const handleAction = (type) => {
    setShowAddMenu(false);
    if (onQuickAction) onQuickAction(type);
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 md:px-8 py-3 flex items-center justify-between transition-colors">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {getPageTitle(activePage)}
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
            FY B.Sc. IT Semester 1 • Academic Workspace
          </p>
        </div>
      </div>

      {/* Right: Quick Action & Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Quick Add Dropdown */}
        <div className="relative">
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="shadow-sm"
          >
            <span className="hidden sm:inline">Quick Add</span>
          </Button>

          {showAddMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowAddMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-30 py-1.5 animate-fade-in text-xs font-semibold">
                <button
                  onClick={() => handleAction('task')}
                  className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600"
                >
                  <CheckSquare className="w-4 h-4 text-red-600" />
                  New Task
                </button>
                <button
                  onClick={() => handleAction('note')}
                  className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600"
                >
                  <FileText className="w-4 h-4 text-red-600" />
                  New Note
                </button>
                <button
                  onClick={() => handleAction('exam')}
                  className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600"
                >
                  <Calendar className="w-4 h-4 text-red-600" />
                  New Exam
                </button>
                <button
                  onClick={() => handleAction('session')}
                  className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600"
                >
                  <Clock className="w-4 h-4 text-red-600" />
                  Log Study Session
                </button>
                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                <button
                  onClick={() => handleAction('subject')}
                  className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600"
                >
                  <BookOpen className="w-4 h-4 text-red-600" />
                  New Subject
                </button>
              </div>
            </>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700/80"
          title={settings.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle dark mode"
        >
          {settings.darkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>
    </header>
  );
};
