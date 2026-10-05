import React, { useState } from 'react';
import { StudyProvider, useStudy } from './context/StudyContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';

// Pages
import { Dashboard } from './pages/Dashboard';
import { AIAssistant } from './pages/AIAssistant';
import { SubjectsPage } from './pages/SubjectsPage';
import { TasksPage } from './pages/TasksPage';
import { NotesPage } from './pages/NotesPage';
import { ExamsPage } from './pages/ExamsPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { ProgressPage } from './pages/ProgressPage';
import { SmartInsightsPage } from './pages/SmartInsightsPage';
import { SettingsPage } from './pages/SettingsPage';

// Quick Modals
import { TaskModal } from './components/tasks/TaskModal';
import { NoteModal } from './components/notes/NoteModal';
import { ExamModal } from './components/exams/ExamModal';
import { SessionModal } from './components/planner/SessionModal';
import { SubjectModal } from './components/subjects/SubjectModal';
import { SubjectDetailModal } from './components/subjects/SubjectDetailModal';

const MainLayout = () => {
  const {
    activePage,
    setActivePage,
    subjects,
    tasks,
    notes,
    exams,
    sessions,
    addTask,
    addNote,
    addExam,
    addSession,
    addSubject,
    toggleTaskStatus
  } = useStudy();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Quick Action Modal states
  const [quickModalType, setQuickModalType] = useState(null); // 'task' | 'note' | 'exam' | 'session' | 'subject'
  const [selectedSubjectDetail, setSelectedSubjectDetail] = useState(null);

  const handleQuickAction = (type) => {
    setQuickModalType(type);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            onQuickAction={handleQuickAction}
            onSelectSubject={(sub) => setSelectedSubjectDetail(sub)}
          />
        );
      case 'ai-assistant':
        return <AIAssistant />;
      case 'subjects':
        return <SubjectsPage />;
      case 'tasks':
        return <TasksPage />;
      case 'notes':
        return <NotesPage />;
      case 'exams':
        return <ExamsPage />;
      case 'planner':
        return <StudyPlannerPage />;
      case 'progress':
        return <ProgressPage />;
      case 'insights':
        return <SmartInsightsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onQuickAction={handleQuickAction} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer & Bottom Tab Bar */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Navbar
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onQuickAction={handleQuickAction}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Quick Action Modals */}
      <TaskModal
        isOpen={quickModalType === 'task'}
        onClose={() => setQuickModalType(null)}
        onSubmit={(data) => addTask(data)}
        subjects={subjects}
      />

      <NoteModal
        isOpen={quickModalType === 'note'}
        onClose={() => setQuickModalType(null)}
        onSubmit={(data) => addNote(data)}
        subjects={subjects}
      />

      <ExamModal
        isOpen={quickModalType === 'exam'}
        onClose={() => setQuickModalType(null)}
        onSubmit={(data) => addExam(data)}
        subjects={subjects}
      />

      <SessionModal
        isOpen={quickModalType === 'session'}
        onClose={() => setQuickModalType(null)}
        onSubmit={(data) => addSession(data)}
        subjects={subjects}
      />

      <SubjectModal
        isOpen={quickModalType === 'subject'}
        onClose={() => setQuickModalType(null)}
        onSubmit={(data) => addSubject(data)}
      />

      <SubjectDetailModal
        isOpen={!!selectedSubjectDetail}
        onClose={() => setSelectedSubjectDetail(null)}
        subject={selectedSubjectDetail}
        tasks={tasks}
        notes={notes}
        exams={exams}
        sessions={sessions}
        onToggleTask={toggleTaskStatus}
      />
    </div>
  );
};

export default function App() {
  return (
    <StudyProvider>
      <MainLayout />
    </StudyProvider>
  );
}
