import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Button } from '../components/common/Button';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  RotateCcw,
  Trash2,
  Save,
  Check,
  User,
  GraduationCap,
  HardDrive,
  Info
} from 'lucide-react';

export const SettingsPage = () => {
  const {
    settings,
    updateSettings,
    resetAllData,
    reloadSampleData,
    subjects,
    tasks,
    exams,
    notes,
    sessions,
    chats
  } = useStudy();

  const [studentName, setStudentName] = useState(settings.studentName || '');
  const [college, setCollege] = useState(settings.college || '');
  const [semester, setSemester] = useState(settings.semester || '');
  const [weeklyGoalHours, setWeeklyGoalHours] = useState(settings.weeklyGoalHours || 15);
  const [isSaved, setIsSaved] = useState(false);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isReloadConfirmOpen, setIsReloadConfirmOpen] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateSettings({
      studentName: studentName.trim(),
      college: college.trim(),
      semester: semester.trim(),
      weeklyGoalHours: Number(weeklyGoalHours) || 15
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-red-600" />
          Settings & LocalStorage Management
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Customize your student profile, appearance preferences, and offline data storage
        </p>
      </div>

      {/* College Project Submission Attribution Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/40 dark:to-slate-900 border border-red-200 dark:border-red-900/60 shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
            College Academic Project
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            B.Sc. Information Technology - First Year
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Project Title: <strong>AI Study Assistant for College Students</strong>. Designed for pair-programming first-year students to streamline coursework, syllabus progress, assignment tracking, and academic Q&A.
          </p>
        </div>
      </div>

      {/* Student Profile Settings Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-red-600" />
          Student & Team Profile
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Student / Team Names
              </label>
              <input
                type="text"
                placeholder="e.g. Kenric & Teammate"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Academic Year / Semester
              </label>
              <input
                type="text"
                placeholder="e.g. First Year (Semester 1)"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                College / Department
              </label>
              <input
                type="text"
                placeholder="e.g. Department of Information Technology"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Weekly Study Goal (Hours)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={weeklyGoalHours}
                onChange={(e) => setWeeklyGoalHours(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              icon={isSaved ? Check : Save}
            >
              {isSaved ? 'Profile Saved!' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>

      {/* Appearance Settings */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
          Appearance & Theme
        </h3>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Dark Mode Theme
            </p>
            <p className="text-xs text-slate-400">
              Switch between Red & White Light Theme and Red-Accented Dark Mode
            </p>
          </div>

          <Button
            size="sm"
            variant="secondary"
            icon={settings.darkMode ? Sun : Moon}
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
          >
            {settings.darkMode ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </div>
      </div>

      {/* LocalStorage Data Status & Management */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-red-600" />
              Browser LocalStorage Status
            </h3>
            <p className="text-xs text-slate-400">
              All data is stored directly and safely in your local browser sandbox
            </p>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Active & Synced
          </span>
        </div>

        {/* Counts Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-400 text-[10px]">Subjects</p>
            <p className="font-bold text-slate-800 dark:text-white mt-0.5">{subjects.length}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-400 text-[10px]">Tasks</p>
            <p className="font-bold text-slate-800 dark:text-white mt-0.5">{tasks.length}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-400 text-[10px]">Exams</p>
            <p className="font-bold text-slate-800 dark:text-white mt-0.5">{exams.length}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-400 text-[10px]">Notes</p>
            <p className="font-bold text-slate-800 dark:text-white mt-0.5">{notes.length}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-400 text-[10px]">Sessions</p>
            <p className="font-bold text-slate-800 dark:text-white mt-0.5">{sessions.length}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-400 text-[10px]">Chats</p>
            <p className="font-bold text-slate-800 dark:text-white mt-0.5">{chats.length}</p>
          </div>
        </div>

        {/* Data Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Button
            size="sm"
            variant="secondary"
            icon={RotateCcw}
            onClick={() => setIsReloadConfirmOpen(true)}
          >
            Reload Sample College Data
          </Button>

          <Button
            size="sm"
            variant="danger"
            icon={Trash2}
            onClick={() => setIsResetConfirmOpen(true)}
          >
            Reset / Clear All Data
          </Button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetAllData}
        title="Reset All Application Data"
        message="Are you sure you want to permanently clear all subjects, tasks, notes, exams, study sessions, and AI chat history? This action cannot be undone."
        confirmText="Yes, Clear Everything"
        isDanger={true}
      />

      {/* Reload Sample Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isReloadConfirmOpen}
        onClose={() => setIsReloadConfirmOpen(false)}
        onConfirm={reloadSampleData}
        title="Reload Sample College Data"
        message="This will overwrite current data with the default sample First Year B.Sc. IT semester subjects, tasks, exams, notes, and study sessions. Proceed?"
        confirmText="Reload Sample Data"
        isDanger={false}
      />
    </div>
  );
};
