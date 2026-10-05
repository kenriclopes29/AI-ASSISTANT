import { getDaysRemaining } from './dateUtils';

/**
 * Smart Study Insights Engine
 * Purely data-driven heuristic analysis of the student's academic progress,
 * deadlines, study logs, and workload without making false AI claims.
 */

export const generateSmartInsights = ({
  subjects = [],
  tasks = [],
  exams = [],
  sessions = [],
  notes = []
}) => {
  const insights = [];

  // 1. Check for Overdue Tasks
  const overdueTasks = tasks.filter(
    (t) => t.status !== 'completed' && getDaysRemaining(t.dueDate) < 0
  );
  if (overdueTasks.length > 0) {
    insights.push({
      id: 'overdue-tasks',
      type: 'critical',
      title: `${overdueTasks.length} Overdue Assignment${overdueTasks.length > 1 ? 's' : ''}`,
      message: `You have overdue tasks including "${overdueTasks[0].title}". Prioritize submitting these first to avoid grade penalties.`,
      actionLabel: 'View Overdue Tasks',
      actionPage: 'tasks',
      badge: 'Action Required',
      priority: 1
    });
  }

  // 2. Urgent Exams (within 7 days)
  const upcomingExams = exams
    .filter((e) => e.status !== 'Completed')
    .map((e) => ({ ...e, days: getDaysRemaining(e.date) }))
    .filter((e) => e.days >= 0 && e.days <= 7)
    .sort((a, b) => a.days - b.days);

  if (upcomingExams.length > 0) {
    const nextExam = upcomingExams[0];
    const daysLabel = nextExam.days === 0 ? 'today' : nextExam.days === 1 ? 'tomorrow' : `in ${nextExam.days} days`;
    insights.push({
      id: 'urgent-exam',
      type: 'warning',
      title: `Upcoming Exam: ${nextExam.title}`,
      message: `Your ${nextExam.type || 'Exam'} for ${nextExam.subject} is scheduled ${daysLabel}. Focus your study sessions on core revision units.`,
      actionLabel: 'View Exams',
      actionPage: 'exams',
      badge: `Exam in ${nextExam.days}d`,
      priority: 2
    });
  }

  // 3. Subject Needing Most Attention (lowest progress)
  if (subjects.length > 0) {
    const sortedByProgress = [...subjects].sort((a, b) => (a.progress || 0) - (b.progress || 0));
    const lowestSubject = sortedByProgress[0];
    if (lowestSubject && lowestSubject.progress < 60) {
      insights.push({
        id: 'low-progress-subject',
        type: 'attention',
        title: `${lowestSubject.name} Needs Attention`,
        message: `${lowestSubject.name} (${lowestSubject.code}) is currently at ${lowestSubject.progress}% progress. Schedule a 45-minute revision block for this subject.`,
        actionLabel: 'Plan Study Session',
        actionPage: 'planner',
        badge: `${lowestSubject.progress}% Progress`,
        priority: 3
      });
    }
  }

  // 4. Tasks Due in Next 48 Hours
  const dueSoonTasks = tasks.filter(
    (t) => t.status !== 'completed' && getDaysRemaining(t.dueDate) >= 0 && getDaysRemaining(t.dueDate) <= 2
  );
  if (dueSoonTasks.length > 0) {
    insights.push({
      id: 'due-soon-tasks',
      type: 'info',
      title: `${dueSoonTasks.length} Task${dueSoonTasks.length > 1 ? 's' : ''} Due in 48 Hours`,
      message: `Upcoming deadlines: "${dueSoonTasks.map((t) => t.title).slice(0, 2).join('", "')}". Keep steady momentum today.`,
      actionLabel: 'Manage Tasks',
      actionPage: 'tasks',
      badge: 'Due Soon',
      priority: 4
    });
  }

  // 5. Total Study Time Analysis
  const totalStudyMinutes = sessions.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);
  const totalHours = (totalStudyMinutes / 60).toFixed(1);
  if (sessions.length >= 3) {
    insights.push({
      id: 'study-consistency',
      type: 'success',
      title: 'Strong Study Habit Detected',
      message: `You have logged ${totalHours} hours across ${sessions.length} study sessions. Consistent spaced repetition leads to better memory retention.`,
      actionLabel: 'View Analytics',
      actionPage: 'progress',
      badge: `${totalHours} hrs logged`,
      priority: 5
    });
  } else {
    insights.push({
      id: 'log-study-sessions',
      type: 'info',
      title: 'Start Logging Daily Study Sessions',
      message: 'Log your daily study blocks with topics and durations to unlock weekly analytics and time tracking.',
      actionLabel: 'Log Session',
      actionPage: 'planner',
      badge: 'Productivity Tip',
      priority: 5
    });
  }

  // 6. Notes Coverage Check
  if (subjects.length > 0) {
    const subjectsWithoutNotes = subjects.filter(
      (sub) => !notes.some((n) => n.subject === sub.code || n.subject === sub.name)
    );
    if (subjectsWithoutNotes.length > 0) {
      const sub = subjectsWithoutNotes[0];
      insights.push({
        id: 'missing-notes',
        type: 'recommendation',
        title: `Create Summary Notes for ${sub.name}`,
        message: `You don't have any saved revision notes for ${sub.code} yet. Writing synthesized summaries reinforces long-term memory.`,
        actionLabel: 'Create Note',
        actionPage: 'notes',
        badge: 'Note-Taking Tip',
        priority: 6
      });
    }
  }

  // 7. General Balanced Recommendation
  const pendingCount = tasks.filter((t) => t.status !== 'completed').length;
  if (pendingCount >= 4) {
    insights.push({
      id: 'workload-balance',
      type: 'warning',
      title: 'High Assignment Load',
      message: `You currently have ${pendingCount} pending assignments. Consider using the 25-minute Pomodoro method to tackle them one by one.`,
      actionLabel: 'Open Tasks',
      actionPage: 'tasks',
      badge: `${pendingCount} Pending`,
      priority: 7
    });
  }

  return insights.sort((a, b) => a.priority - b.priority);
};
