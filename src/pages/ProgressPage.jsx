import React, { useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { StatCard } from '../components/common/StatCard';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Calendar,
  BookOpen,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from 'recharts';

export const ProgressPage = () => {
  const {
    subjects,
    tasks,
    exams,
    sessions,
    completedTasks,
    totalStudyHours,
    totalStudyMinutes,
    overallProgress
  } = useStudy();

  // Subject study time & progress data for chart
  const subjectChartData = useMemo(() => {
    return subjects.map((sub) => {
      const subMins = sessions
        .filter((s) => s.subject === sub.code)
        .reduce((sum, s) => sum + (Number(s.duration) || 0), 0);
      const subTasks = tasks.filter((t) => t.subject === sub.code);
      const subCompleted = subTasks.filter((t) => t.status === 'completed').length;

      return {
        code: sub.code,
        name: sub.name,
        progress: sub.progress || 0,
        studyHours: Number((subMins / 60).toFixed(1)),
        tasksCompleted: subCompleted,
        totalTasks: subTasks.length,
        color: sub.color || '#dc2626'
      };
    });
  }, [subjects, sessions, tasks]);

  // Priority distribution data for Pie Chart
  const priorityPieData = useMemo(() => {
    const high = tasks.filter((t) => t.priority === 'High').length;
    const med = tasks.filter((t) => t.priority === 'Medium').length;
    const low = tasks.filter((t) => t.priority === 'Low').length;
    return [
      { name: 'High Priority', value: high, color: '#dc2626' },
      { name: 'Medium Priority', value: med, color: '#f59e0b' },
      { name: 'Low Priority', value: low, color: '#10b981' }
    ].filter((p) => p.value > 0);
  }, [tasks]);

  // Exam Preparation Progress
  const completedExamsCount = exams.filter((e) => e.status === 'Completed').length;
  const examPrepPercentage =
    exams.length > 0 ? Math.round((completedExamsCount / exams.length) * 100) : 0;

  const taskCompletionPercentage =
    tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Academic Progress & Performance Analytics
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Visualize syllabus coverage, study time distribution, and task completion metrics
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Syllabus Progress"
          value={`${overallProgress}%`}
          subtitle="Average across all subjects"
          icon={TrendingUp}
        />
        <StatCard
          title="Task Completion Rate"
          value={`${taskCompletionPercentage}%`}
          subtitle={`${completedTasks.length} of ${tasks.length} tasks completed`}
          icon={CheckCircle2}
        />
        <StatCard
          title="Total Study Time"
          value={`${totalStudyHours} hrs`}
          subtitle={`${sessions.length} sessions logged`}
          icon={Clock}
        />
        <StatCard
          title="Exams Completed"
          value={`${completedExamsCount} / ${exams.length}`}
          subtitle={`${examPrepPercentage}% overall exam readiness`}
          icon={Calendar}
        />
      </div>

      {/* Overall Progress Bar Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-red-600" />
              Semester 1 Target Completion
            </h3>
            <p className="text-xs text-slate-400">
              Composite score based on syllabus covered and completed coursework
            </p>
          </div>
          <span className="text-xl font-extrabold text-red-600 dark:text-red-400">
            {overallProgress}%
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden mt-3">
          <div
            className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject-Wise Progress Bar Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Subject-Wise Progress (%)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Comparison of syllabus completion across enrolled subjects
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="code"
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
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip
                  cursor={{ fill: 'rgba(239, 68, 68, 0.08)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-3 bg-slate-900 text-white rounded-xl text-xs shadow-xl border border-slate-800">
                          <p className="font-bold text-red-400">
                            {data.code}: {data.name}
                          </p>
                          <p className="mt-1 font-semibold">Progress: {data.progress}%</p>
                          <p className="text-slate-400 mt-0.5">
                            Study Time: {data.studyHours} hrs
                          </p>
                          <p className="text-slate-400">
                            Tasks: {data.tasksCompleted}/{data.totalTasks}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="progress" radius={[6, 6, 0, 0]}>
                  {subjectChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || '#dc2626'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Priority Distribution Pie Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Task Priority Breakdown
            </h3>
            <p className="text-xs text-slate-400 mb-2">
              Workload distribution by urgency
            </p>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {priorityPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0];
                        return (
                          <div className="p-2 bg-slate-900 text-white rounded-lg text-xs">
                            <span className="font-bold">{item.name}:</span> {item.value} tasks
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {priorityPieData.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  {p.name}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Subject Performance Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Detailed Course Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                <th className="pb-3 px-3">Subject</th>
                <th className="pb-3 px-3">Instructor</th>
                <th className="pb-3 px-3">Syllabus Progress</th>
                <th className="pb-3 px-3">Tasks Completed</th>
                <th className="pb-3 px-3">Hours Studied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {subjectChartData.map((sub) => (
                <tr key={sub.code} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: sub.color }}
                      />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {sub.code} - {sub.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {subjects.find((s) => s.code === sub.code)?.teacher || 'Faculty'}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${sub.progress}%`,
                            backgroundColor: sub.color
                          }}
                        />
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {sub.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    {sub.tasksCompleted} / {sub.totalTasks}
                  </td>
                  <td className="py-3 px-3 font-bold text-red-600 dark:text-red-400">
                    {sub.studyHours}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
