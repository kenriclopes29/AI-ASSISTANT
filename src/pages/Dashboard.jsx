import React, { useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatDate, getRelativeDaysBadge, isDueToday } from '../utils/dateUtils';
import {
  BookOpen,
  CheckSquare,
  CheckCircle2,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  FileText,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

export const Dashboard = ({ onQuickAction, onSelectSubject }) => {
  const {
    subjects,
    tasks,
    exams,
    notes,
    sessions,
    pendingTasks,
    completedTasks,
    upcomingExams,
    totalStudyHours,
    overallProgress,
    setActivePage,
    toggleTaskStatus
  } = useStudy();

  // Tasks due today or urgent
  const todayTasks = tasks.filter(
    (t) => t.status !== 'completed' && (isDueToday(t.dueDate) || t.priority === 'High')
  );

  // Next 3 upcoming exams/deadlines
  const sortedUpcomingExams = useMemo(() => {
    return [...upcomingExams].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ).slice(0, 3);
  }, [upcomingExams]);

  // Recent notes (sorted by updatedAt)
  const recentNotes = useMemo(() => {
    return [...notes]
      .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
      .slice(0, 3);
  }, [notes]);

  // Recent study sessions
  const recentSessions = useMemo(() => {
    return [...sessions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, [sessions]);

  // Chart data: Study time per day for the last 7 days
  const weeklyStudyData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });

      const dayMins = sessions
        .filter((s) => s.date === dateStr)
        .reduce((sum, s) => sum + (Number(s.duration) || 0), 0);

      days.push({
        day: dayLabel,
        minutes: dayMins,
        hours: (dayMins / 60).toFixed(1)
      });
    }
    return days;
  }, [sessions]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Welcome Banner with Quick Actions */}
      <div className="rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 md:p-8 shadow-brand relative overflow-hidden">
        {/* Subtle geometric circle overlay */}
        <div className="absolute right-0 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FY B.Sc. IT Semester 1 • College Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, Student! 👋
            </h1>
            <p className="mt-1.5 text-sm text-red-100 max-w-xl">
              You have <span className="font-bold underline">{pendingTasks.length} pending tasks</span> and{' '}
              <span className="font-bold underline">{upcomingExams.length} upcoming exams</span>. Keep up your study streak!
            </p>
          </div>

          {/* Quick-action buttons */}
          <div className="flex flex-wrap gap-2.5">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-red-600 hover:bg-red-50 border-none font-bold"
              icon={Plus}
              onClick={() => onQuickAction('task')}
            >
              Add Task
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30 border-white/30 backdrop-blur-md font-semibold"
              icon={FileText}
              onClick={() => onQuickAction('note')}
            >
              Add Note
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30 border-white/30 backdrop-blur-md font-semibold"
              icon={Calendar}
              onClick={() => onQuickAction('exam')}
            >
              Add Exam
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30 border-white/30 backdrop-blur-md font-semibold"
              icon={Clock}
              onClick={() => setActivePage('planner')}
            >
              Start Session
            </Button>
          </div>
        </div>
      </div>

      {/* Top 5 Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <StatCard
          title="Total Subjects"
          value={subjects.length}
          subtitle="Enrolled courses"
          icon={BookOpen}
          onClick={() => setActivePage('subjects')}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks.length}
          subtitle="Assignments due"
          icon={CheckSquare}
          onClick={() => setActivePage('tasks')}
        />
        <StatCard
          title="Completed Tasks"
          value={completedTasks.length}
          subtitle="Finished successfully"
          icon={CheckCircle2}
          onClick={() => setActivePage('tasks')}
        />
        <StatCard
          title="Upcoming Exams"
          value={upcomingExams.length}
          subtitle="Scheduled tests"
          icon={Calendar}
          onClick={() => setActivePage('exams')}
        />
        <StatCard
          title="Overall Progress"
          value={`${overallProgress}%`}
          subtitle="Syllabus coverage"
          icon={TrendingUp}
          onClick={() => setActivePage('progress')}
        />
      </div>

      {/* Charts & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Study Minutes Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                Weekly Study Activity (Minutes)
              </h3>
              <p className="text-xs text-slate-500">
                Total logged time: <span className="font-bold text-red-600">{totalStudyHours} hours</span>
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={ArrowRight}
              onClick={() => setActivePage('progress')}
            >
              View Analytics
            </Button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStudyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  unit="m"
                />
                <Tooltip
                  cursor={{ fill: 'rgba(239, 68, 68, 0.08)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-2.5 bg-slate-900 text-white rounded-xl text-xs shadow-xl border border-slate-800">
                          <p className="font-bold text-red-400">{data.day}</p>
                          <p className="mt-1 font-semibold">
                            {data.minutes} mins ({data.hours} hrs)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                  {weeklyStudyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.minutes > 0 ? '#dc2626' : '#fca5a5'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subjects Progress Bar Widget */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Subject Progress
            </h3>
            <button
              onClick={() => setActivePage('subjects')}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              See All
            </button>
          </div>

          <div className="space-y-3.5 flex-1 overflow-y-auto">
            {subjects.slice(0, 5).map((s) => (
              <div
                key={s.id}
                onClick={() => onSelectSubject(s)}
                className="cursor-pointer group p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-red-600 transition-colors">
                    {s.code} - {s.name}
                  </span>
                  <span className="font-bold text-slate-500 dark:text-slate-400 ml-2">
                    {s.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${s.progress}%`,
                      backgroundColor: s.color || '#dc2626'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => onQuickAction('subject')}
            >
              + Add New Subject
            </Button>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Today's Tasks & Upcoming Deadlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Tasks & Urgent Assignments */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-red-600" />
                Priority & Due Tasks ({todayTasks.length})
              </h3>
              <p className="text-xs text-slate-400">High priority or due soon</p>
            </div>
            <button
              onClick={() => setActivePage('tasks')}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              View All Tasks
            </button>
          </div>

          {todayTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                All caught up! No urgent tasks pending.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs"
                onClick={() => onQuickAction('task')}
              >
                + Create Task
              </Button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {todayTasks.slice(0, 4).map((task) => {
                const daysBadge = getRelativeDaysBadge(task.dueDate, task.status);
                return (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-red-200 bg-white dark:bg-slate-900 flex items-center justify-between transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={() => toggleTaskStatus(task.id)}
                        className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                      />
                      <div className="min-w-0">
                        <p
                          className={`font-semibold truncate ${
                            task.status === 'completed'
                              ? 'line-through text-slate-400'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {task.subject} • Due {formatDate(task.dueDate)}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${daysBadge.color}`}>
                      {daysBadge.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming Exams & Important Deadlines */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-600" />
                Upcoming Exams & Deadlines
              </h3>
              <p className="text-xs text-slate-400">Next tests and submission dates</p>
            </div>
            <button
              onClick={() => setActivePage('exams')}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              View Schedule
            </button>
          </div>

          {sortedUpcomingExams.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                No upcoming exams scheduled.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs"
                onClick={() => onQuickAction('exam')}
              >
                + Schedule Exam
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedUpcomingExams.map((exam) => {
                const daysBadge = getRelativeDaysBadge(exam.date, exam.status);
                return (
                  <div
                    key={exam.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                        {exam.subject} • {exam.type}
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white mt-0.5">
                        {exam.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {formatDate(exam.date)}
                      </p>
                    </div>

                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${daysBadge.color}`}>
                      {daysBadge.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Two Column Grid: Recent Notes & Recent Study Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recently Created/Updated Notes */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-600" />
              Recent Notes
            </h3>
            <button
              onClick={() => setActivePage('notes')}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              All Notes ({notes.length})
            </button>
          </div>

          <div className="space-y-3">
            {recentNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setActivePage('notes')}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-900 bg-white dark:bg-slate-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400">
                    {note.subject}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {formatDate(note.updatedAt || note.createdAt)}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {note.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Study Sessions */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              Recent Study Sessions
            </h3>
            <button
              onClick={() => setActivePage('planner')}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              Open Planner
            </button>
          </div>

          <div className="space-y-2.5">
            {recentSessions.map((session) => (
              <div
                key={session.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    {session.topic || 'Study Session'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {session.subject} • {formatDate(session.date)}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-200 dark:border-red-900 flex-shrink-0">
                  {session.duration} mins
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
