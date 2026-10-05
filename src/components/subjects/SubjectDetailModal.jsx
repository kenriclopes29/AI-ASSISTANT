import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatDate, getRelativeDaysBadge } from '../../utils/dateUtils';
import {
  CheckSquare,
  FileText,
  Calendar,
  Clock,
  User,
  BookOpen
} from 'lucide-react';

export const SubjectDetailModal = ({
  isOpen,
  onClose,
  subject,
  tasks = [],
  notes = [],
  exams = [],
  sessions = [],
  onToggleTask,
  onEdit
}) => {
  if (!subject) return null;

  const subjectTasks = tasks.filter((t) => t.subject === subject.code);
  const subjectNotes = notes.filter((n) => n.subject === subject.code);
  const subjectExams = exams.filter((e) => e.subject === subject.code);
  const subjectSessions = sessions.filter((s) => s.subject === subject.code);

  const totalStudyMinutes = subjectSessions.reduce(
    (acc, s) => acc + (Number(s.duration) || 0),
    0
  );
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${subject.name} (${subject.code})`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
              style={{ backgroundColor: subject.color || '#dc2626' }}
            >
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {subject.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5" />
                Instructor: {subject.teacher}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-48">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Syllabus Progress
              </span>
              <span className="font-bold text-red-600 dark:text-red-400">
                {subject.progress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 font-medium">Tasks</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {subjectTasks.filter((t) => t.status === 'completed').length} / {subjectTasks.length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 font-medium">Study Notes</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {subjectNotes.length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 font-medium">Exams / Quizzes</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {subjectExams.length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 font-medium">Study Time</p>
            <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-0.5">
              {totalStudyHours}h
            </p>
          </div>
        </div>

        {/* Related Tasks Section */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-red-600" />
            Related Tasks ({subjectTasks.length})
          </h5>
          {subjectTasks.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">No tasks assigned to this subject yet.</p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {subjectTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={t.status === 'completed'}
                      onChange={() => onToggleTask(t.id)}
                      className="accent-red-600 w-4 h-4 rounded cursor-pointer"
                    />
                    <span
                      className={`truncate ${
                        t.status === 'completed'
                          ? 'line-through text-slate-400'
                          : 'font-medium text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {t.title}
                    </span>
                  </div>
                  <Badge variant={t.priority === 'High' ? 'high' : t.priority === 'Medium' ? 'medium' : 'low'}>
                    {t.priority}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Exams Section */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-red-600" />
            Upcoming & Past Exams ({subjectExams.length})
          </h5>
          {subjectExams.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">No exams scheduled for this subject.</p>
          ) : (
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {subjectExams.map((e) => {
                const badge = getRelativeDaysBadge(e.date, e.status);
                return (
                  <div
                    key={e.id}
                    className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{e.title}</p>
                      <p className="text-[11px] text-slate-400">{formatDate(e.date)} • {e.type}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badge.color}`}>
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Related Notes Section */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-red-600" />
            Notes & Summaries ({subjectNotes.length})
          </h5>
          {subjectNotes.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">No notes created for this subject yet.</p>
          ) : (
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {subjectNotes.map((n) => (
                <div
                  key={n.id}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {n.content?.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              onClose();
              if (onEdit) onEdit(subject);
            }}
          >
            Edit Subject Details
          </Button>
          <Button variant="primary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
