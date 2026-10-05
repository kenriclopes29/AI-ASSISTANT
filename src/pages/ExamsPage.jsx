import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { ExamModal } from '../components/exams/ExamModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { formatDate, getRelativeDaysBadge, getDaysRemaining } from '../utils/dateUtils';
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export const ExamsPage = () => {
  const { subjects, exams, addExam, updateExam, deleteExam, toggleExamStatus } = useStudy();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [examToDelete, setExamToDelete] = useState(null);

  const upcomingList = exams
    .filter((e) => e.status !== 'Completed')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const completedList = exams
    .filter((e) => e.status === 'Completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleOpenAdd = () => {
    setEditingExam(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exam) => {
    setEditingExam(exam);
    setIsModalOpen(true);
  };

  const handleSaveExam = (data) => {
    if (editingExam) {
      updateExam(editingExam.id, data);
    } else {
      addExam(data);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Exams & Deadlines Tracker
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor midterms, final examinations, quizzes, viva tests, and major academic milestones
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
          Schedule Exam
        </Button>
      </div>

      {/* Upcoming Exams Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-red-600" />
          Upcoming Examinations ({upcomingList.length})
        </h3>

        {upcomingList.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No upcoming exams scheduled"
            description="You don't have any pending tests or quizzes recorded."
            actionLabel="Schedule Exam"
            onAction={handleOpenAdd}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingList.map((exam) => {
              const days = getDaysRemaining(exam.date);
              const badge = getRelativeDaysBadge(exam.date, exam.status);

              return (
                <div
                  key={exam.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-brand transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-900">
                          {exam.subject}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {exam.type}
                        </span>
                      </div>

                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {exam.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Exam Date: <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(exam.date)}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={CheckCircle}
                      onClick={() => toggleExamStatus(exam.id)}
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                    >
                      Mark Completed
                    </Button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(exam)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit Exam"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setExamToDelete(exam)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        title="Delete Exam"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Exams Section */}
      {completedList.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Completed Examinations ({completedList.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {completedList.map((exam) => (
              <div
                key={exam.id}
                className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-slate-500">{exam.subject}</span>
                    <span className="text-[10px] text-slate-400">{exam.type}</span>
                  </div>
                  <h5 className="font-bold text-slate-700 dark:text-slate-300">{exam.title}</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">Conducted {formatDate(exam.date)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExamStatus(exam.id)}
                    className="text-xs text-slate-400 hover:text-red-600 underline"
                  >
                    Reopen
                  </button>
                  <button
                    onClick={() => setExamToDelete(exam)}
                    className="p-1 text-slate-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exam Modal */}
      <ExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveExam}
        subjects={subjects}
        initialData={editingExam}
      />

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!examToDelete}
        onClose={() => setExamToDelete(null)}
        onConfirm={() => deleteExam(examToDelete?.id)}
        title="Delete Exam"
        message={`Are you sure you want to delete "${examToDelete?.title}"?`}
        confirmText="Delete Exam"
      />
    </div>
  );
};
