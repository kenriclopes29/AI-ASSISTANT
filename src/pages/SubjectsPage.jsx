import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { SubjectModal } from '../components/subjects/SubjectModal';
import { SubjectDetailModal } from '../components/subjects/SubjectDetailModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  User,
  CheckSquare,
  FileText,
  Calendar,
  Clock
} from 'lucide-react';

export const SubjectsPage = () => {
  const {
    subjects,
    tasks,
    notes,
    exams,
    sessions,
    addSubject,
    updateSubject,
    deleteSubject,
    toggleTaskStatus
  } = useStudy();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [selectedSubjectDetail, setSelectedSubjectDetail] = useState(null);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleOpenAdd = () => {
    setEditingSubject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (subject, e) => {
    if (e) e.stopPropagation();
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (subject, e) => {
    if (e) e.stopPropagation();
    setSubjectToDelete(subject);
  };

  const handleSaveSubject = (data) => {
    if (editingSubject) {
      updateSubject(editingSubject.id, data);
    } else {
      addSubject(data);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Enrolled Subjects
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your academic curriculum, teachers, syllabus completion, and linked tasks
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
          Add Subject
        </Button>
      </div>

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No subjects added yet"
          description="Add your first college course to organize assignments, notes, and exams."
          actionLabel="Add Subject"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {subjects.map((sub) => {
            const subTasks = tasks.filter((t) => t.subject === sub.code);
            const subNotes = notes.filter((n) => n.subject === sub.code);
            const subExams = exams.filter((e) => e.subject === sub.code);
            const subSessions = sessions.filter((s) => s.subject === sub.code);
            const completedCount = subTasks.filter((t) => t.status === 'completed').length;

            return (
              <div
                key={sub.id}
                onClick={() => setSelectedSubjectDetail(sub)}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-brand hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Color & Code */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0"
                        style={{ backgroundColor: sub.color || '#dc2626' }}
                      >
                        {sub.code.substring(0, 3)}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          {sub.code}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors leading-tight">
                          {sub.name}
                        </h3>
                      </div>
                    </div>

                    {/* Edit & Delete actions */}
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={(e) => handleOpenEdit(sub, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit Subject"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleOpenDelete(sub, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        title="Delete Subject"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Teacher */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-4">
                    <User className="w-3.5 h-3.5" />
                    <span>{sub.teacher}</span>
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-500 font-medium">Syllabus Covered</span>
                      <span className="font-bold text-slate-900 dark:text-white">{sub.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${sub.progress}%`,
                          backgroundColor: sub.color || '#dc2626'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Counts Row */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1" title="Completed / Total Tasks">
                    <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                    {completedCount}/{subTasks.length}
                  </span>
                  <span className="flex items-center gap-1" title="Notes">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    {subNotes.length}
                  </span>
                  <span className="flex items-center gap-1" title="Exams">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {subExams.length}
                  </span>
                  <span className="flex items-center gap-1" title="Study Sessions">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {subSessions.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subject Add/Edit Modal */}
      <SubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveSubject}
        initialData={editingSubject}
      />

      {/* Subject Detail Drilldown Modal */}
      <SubjectDetailModal
        isOpen={!!selectedSubjectDetail}
        onClose={() => setSelectedSubjectDetail(null)}
        subject={selectedSubjectDetail}
        tasks={tasks}
        notes={notes}
        exams={exams}
        sessions={sessions}
        onToggleTask={toggleTaskStatus}
        onEdit={(sub) => {
          setSelectedSubjectDetail(null);
          handleOpenEdit(sub);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!subjectToDelete}
        onClose={() => setSubjectToDelete(null)}
        onConfirm={() => deleteSubject(subjectToDelete?.id)}
        title="Delete Subject"
        message={`Are you sure you want to delete ${subjectToDelete?.name} (${subjectToDelete?.code})? Associated tasks and notes will also be removed.`}
        confirmText="Delete Subject"
      />
    </div>
  );
};
