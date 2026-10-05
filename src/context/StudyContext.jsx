import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SUBJECTS,
  INITIAL_TASKS,
  INITIAL_EXAMS,
  INITIAL_NOTES,
  INITIAL_SESSIONS,
  INITIAL_PLANS,
  INITIAL_CHATS,
  INITIAL_SETTINGS
} from '../data/initialData';

const StudyContext = createContext(null);

const STORAGE_KEYS = {
  SUBJECTS: 'study_assistant_subjects_v1',
  TASKS: 'study_assistant_tasks_v1',
  EXAMS: 'study_assistant_exams_v1',
  NOTES: 'study_assistant_notes_v1',
  SESSIONS: 'study_assistant_sessions_v1',
  PLANS: 'study_assistant_plans_v1',
  CHATS: 'study_assistant_chats_v1',
  SETTINGS: 'study_assistant_settings_v1'
};

const loadStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
    return fallback;
  }
};

const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

export const StudyProvider = ({ children }) => {
  // Navigation & Page State
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('ALL');

  // Core Data Collections with LocalStorage hydration
  const [subjects, setSubjects] = useState(() => loadStorage(STORAGE_KEYS.SUBJECTS, INITIAL_SUBJECTS));
  const [tasks, setTasks] = useState(() => loadStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS));
  const [exams, setExams] = useState(() => loadStorage(STORAGE_KEYS.EXAMS, INITIAL_EXAMS));
  const [notes, setNotes] = useState(() => loadStorage(STORAGE_KEYS.NOTES, INITIAL_NOTES));
  const [sessions, setSessions] = useState(() => loadStorage(STORAGE_KEYS.SESSIONS, INITIAL_SESSIONS));
  const [plans, setPlans] = useState(() => loadStorage(STORAGE_KEYS.PLANS, INITIAL_PLANS));
  const [chats, setChats] = useState(() => loadStorage(STORAGE_KEYS.CHATS, INITIAL_CHATS));
  const [settings, setSettings] = useState(() => loadStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS));

  // Dark Mode Sync
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Sync to LocalStorage on updates
  useEffect(() => saveStorage(STORAGE_KEYS.SUBJECTS, subjects), [subjects]);
  useEffect(() => saveStorage(STORAGE_KEYS.TASKS, tasks), [tasks]);
  useEffect(() => saveStorage(STORAGE_KEYS.EXAMS, exams), [exams]);
  useEffect(() => saveStorage(STORAGE_KEYS.NOTES, notes), [notes]);
  useEffect(() => saveStorage(STORAGE_KEYS.SESSIONS, sessions), [sessions]);
  useEffect(() => saveStorage(STORAGE_KEYS.PLANS, plans), [plans]);
  useEffect(() => saveStorage(STORAGE_KEYS.CHATS, chats), [chats]);
  useEffect(() => saveStorage(STORAGE_KEYS.SETTINGS, settings), [settings]);

  // Subject Actions
  const addSubject = (subjectData) => {
    const newSubject = {
      id: `sub-${Date.now()}`,
      progress: 0,
      color: '#dc2626',
      ...subjectData
    };
    setSubjects((prev) => [newSubject, ...prev]);
    return newSubject;
  };

  const updateSubject = (id, updatedFields) => {
    setSubjects((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updatedFields } : sub))
    );
  };

  const deleteSubject = (id) => {
    const subjectToDelete = subjects.find((s) => s.id === id);
    if (!subjectToDelete) return;
    const code = subjectToDelete.code;

    setSubjects((prev) => prev.filter((s) => s.id !== id));
    // Clean up or retain associated items gracefully
    setTasks((prev) => prev.filter((t) => t.subject !== code));
    setExams((prev) => prev.filter((e) => e.subject !== code));
    setNotes((prev) => prev.filter((n) => n.subject !== code));
    setSessions((prev) => prev.filter((s) => s.subject !== code));
    setPlans((prev) => prev.filter((p) => p.subject !== code));
  };

  // Task Actions
  const addTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      status: 'pending',
      priority: 'Medium',
      ...taskData
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Exam Actions
  const addExam = (examData) => {
    const newExam = {
      id: `exam-${Date.now()}`,
      status: 'Upcoming',
      type: 'Midterm',
      ...examData
    };
    setExams((prev) => [newExam, ...prev]);
    return newExam;
  };

  const updateExam = (id, updatedFields) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, ...updatedFields } : exam))
    );
  };

  const toggleExamStatus = (id) => {
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id === id) {
          const nextStatus = exam.status === 'Completed' ? 'Upcoming' : 'Completed';
          return { ...exam, status: nextStatus };
        }
        return exam;
      })
    );
  };

  const deleteExam = (id) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  };

  // Note Actions
  const addNote = (noteData) => {
    const now = new Date().toISOString();
    const newNote = {
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      ...noteData
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id, updatedFields) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updatedFields, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // Session Actions
  const addSession = (sessionData) => {
    const newSession = {
      id: `sess-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      duration: 30,
      ...sessionData
    };
    setSessions((prev) => [newSession, ...prev]);
    return newSession;
  };

  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  // Plan Actions
  const addPlan = (planData) => {
    const newPlan = {
      id: `plan-${Date.now()}`,
      completed: false,
      priority: 'Medium',
      ...planData
    };
    setPlans((prev) => [newPlan, ...prev]);
    return newPlan;
  };

  const updatePlan = (id, updatedFields) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const togglePlanCompleted = (id) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p))
    );
  };

  const deletePlan = (id) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  // AI Chat Actions
  const addChat = ({ question, answer, category = 'General' }) => {
    const newChat = {
      id: `chat-${Date.now()}`,
      question,
      answer,
      category,
      timestamp: new Date().toISOString()
    };
    setChats((prev) => [newChat, ...prev]);
    return newChat;
  };

  const clearChatHistory = () => {
    setChats([]);
  };

  // Settings Actions
  const updateSettings = (updated) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  const resetAllData = () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setSubjects([]);
    setTasks([]);
    setExams([]);
    setNotes([]);
    setSessions([]);
    setPlans([]);
    setChats([]);
    setSettings(INITIAL_SETTINGS);
  };

  const reloadSampleData = () => {
    setSubjects(INITIAL_SUBJECTS);
    setTasks(INITIAL_TASKS);
    setExams(INITIAL_EXAMS);
    setNotes(INITIAL_NOTES);
    setSessions(INITIAL_SESSIONS);
    setPlans(INITIAL_PLANS);
    setChats(INITIAL_CHATS);
    setSettings(INITIAL_SETTINGS);
  };

  // Computed Summaries
  const pendingTasks = tasks.filter((t) => t.status !== 'completed');
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const upcomingExams = exams.filter((e) => e.status !== 'Completed');
  const totalStudyMinutes = sessions.reduce((sum, s) => sum + (Number(s.duration) || 0), 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  // Overall progress is weighted average of subject progress or completed tasks
  const overallProgress =
    subjects.length > 0
      ? Math.round(
          subjects.reduce((sum, s) => sum + (Number(s.progress) || 0), 0) / subjects.length
        )
      : 0;

  return (
    <StudyContext.Provider
      value={{
        // State
        activePage,
        setActivePage,
        selectedSubjectFilter,
        setSelectedSubjectFilter,
        subjects,
        tasks,
        exams,
        notes,
        sessions,
        plans,
        chats,
        settings,

        // Actions
        addSubject,
        updateSubject,
        deleteSubject,

        addTask,
        updateTask,
        toggleTaskStatus,
        deleteTask,

        addExam,
        updateExam,
        toggleExamStatus,
        deleteExam,

        addNote,
        updateNote,
        deleteNote,

        addSession,
        deleteSession,

        addPlan,
        updatePlan,
        togglePlanCompleted,
        deletePlan,

        addChat,
        clearChatHistory,

        updateSettings,
        resetAllData,
        reloadSampleData,

        // Computed
        pendingTasks,
        completedTasks,
        upcomingExams,
        totalStudyMinutes,
        totalStudyHours,
        overallProgress
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
