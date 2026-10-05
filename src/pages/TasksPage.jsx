import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { TaskModal } from '../components/tasks/TaskModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatDate, getRelativeDaysBadge, isOverdue } from '../utils/dateUtils';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TasksPage = () => {
  const { subjects, tasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useStudy();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed' | 'overdue'
  const [subjectFilter, setSubjectFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Quick inline task creation state
  const [quickTitle, setQuickTitle] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(search.toLowerCase())) ||
        task.subject.toLowerCase().includes(search.toLowerCase());

      // Status
      const taskIsOverdue = isOverdue(task.dueDate, task.status);
      let matchesStatus = true;
      if (statusFilter === 'pending') matchesStatus = task.status !== 'completed';
      if (statusFilter === 'completed') matchesStatus = task.status === 'completed';
      if (statusFilter === 'overdue') matchesStatus = taskIsOverdue;

      // Subject
      const matchesSubject = subjectFilter === 'ALL' || task.subject === subjectFilter;

      // Priority
      const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesSubject && matchesPriority;
    });
  }, [tasks, search, statusFilter, subjectFilter, priorityFilter]);

  const handleOpenAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  const handleToggle = (task) => {
    toggleTaskStatus(task.id);
    if (task.status !== 'completed') {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#dc2626', '#ef4444', '#10b981', '#ffffff']
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    addTask({
      title: quickTitle.trim(),
      subject: subjects[0]?.code || 'CS101',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      description: ''
    });
    setQuickTitle('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Tasks & Assignments
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track college assignments, lab reports, problem sets, and submission deadlines
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
          New Task
        </Button>
      </div>

      {/* Quick Task Inline Bar */}
      <form
        onSubmit={handleQuickAdd}
        className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center flex-shrink-0">
          <Plus className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Quick add: Type task title and press Enter (e.g. Solve Question 4 in C Lab Manual)..."
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
        />
        <Button
          type="submit"
          size="sm"
          variant="secondary"
          disabled={!quickTitle.trim()}
          className="text-xs font-semibold"
        >
          Add
        </Button>
      </form>

      {/* Search & Filters Row */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks, descriptions, or subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.code}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          {[
            { id: 'all', label: `All (${tasks.length})` },
            {
              id: 'pending',
              label: `Pending (${tasks.filter((t) => t.status !== 'completed').length})`
            },
            {
              id: 'completed',
              label: `Completed (${tasks.filter((t) => t.status === 'completed').length})`
            },
            {
              id: 'overdue',
              label: `Overdue (${tasks.filter((t) => isOverdue(t.dueDate, t.status)).length})`
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === tab.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks match your filters"
          description="Try clearing search filters or add a new assignment."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setStatusFilter('all');
            setSubjectFilter('ALL');
            setPriorityFilter('ALL');
          }}
        />
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const daysBadge = getRelativeDaysBadge(task.dueDate, task.status);
            const isTaskOverdue = isOverdue(task.dueDate, task.status);

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-150 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isTaskOverdue
                    ? 'border-red-300 dark:border-red-900 bg-red-50/20 dark:bg-red-950/10'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-red-200'
                }`}
              >
                {/* Left: Checkbox & Info */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => handleToggle(task)}
                    className="w-5 h-5 mt-0.5 accent-red-600 rounded cursor-pointer flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {task.subject}
                      </span>
                      <Badge
                        variant={
                          task.priority === 'High'
                            ? 'high'
                            : task.priority === 'Medium'
                            ? 'medium'
                            : 'low'
                        }
                      >
                        {task.priority} Priority
                      </Badge>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${daysBadge.color}`}>
                        {daysBadge.text}
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-bold ${
                        task.status === 'completed'
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Due on {formatDate(task.dueDate)}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenEdit(task)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Edit Task"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTaskToDelete(task)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTask}
        subjects={subjects}
        initialData={editingTask}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={() => deleteTask(taskToDelete?.id)}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
        confirmText="Delete Task"
      />
    </div>
  );
};
