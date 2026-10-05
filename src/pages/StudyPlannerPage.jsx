import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { PlanModal } from '../components/planner/PlanModal';
import { SessionModal } from '../components/planner/SessionModal';
import { ActiveTimer } from '../components/planner/ActiveTimer';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatDate } from '../utils/dateUtils';
import {
  Clock,
  Plus,
  Calendar,
  CheckCircle,
  Circle,
  Trash2,
  Edit2,
  Check,
  Target
} from 'lucide-react';

export const StudyPlannerPage = () => {
  const {
    subjects,
    plans,
    sessions,
    addPlan,
    updatePlan,
    deletePlan,
    togglePlanCompleted,
    addSession,
    deleteSession,
    totalStudyHours
  } = useStudy();

  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'history'

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planToDelete, setPlanToDelete] = useState(null);

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const handleSavePlan = (data) => {
    if (editingPlan) {
      updatePlan(editingPlan.id, data);
    } else {
      addPlan(data);
    }
  };

  const handleSaveSession = (data) => {
    addSession(data);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Study Planner & Session Logger
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Organize revision goals, time allocations, and record live study sessions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            icon={Clock}
            onClick={() => setIsSessionModalOpen(true)}
          >
            Log Session Manually
          </Button>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => {
              setEditingPlan(null);
              setIsPlanModalOpen(true);
            }}
          >
            Create Study Plan
          </Button>
        </div>
      </div>

      {/* Real-time Study Timer / Pomodoro Widget */}
      <ActiveTimer />

      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('plans')}
            className={`pb-2 text-sm font-bold transition-colors relative ${
              activeTab === 'plans'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Planned Study Goals ({plans.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2 text-sm font-bold transition-colors relative ${
              activeTab === 'history'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Study Session History ({sessions.length})
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Total Time Studied:{' '}
          <strong className="text-red-600 dark:text-red-400 font-bold">
            {totalStudyHours} hrs
          </strong>
        </span>
      </div>

      {/* Content depending on Active Tab */}
      {activeTab === 'plans' ? (
        plans.length === 0 ? (
          <EmptyState
            icon={Target}
            title="No study plans yet"
            description="Create your first study goal with target topic, time allocation, and deadline."
            actionLabel="Create Study Plan"
            onAction={() => {
              setEditingPlan(null);
              setIsPlanModalOpen(true);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-brand transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-900">
                      {plan.subject}
                    </span>

                    <Badge
                      variant={
                        plan.priority === 'High'
                          ? 'high'
                          : plan.priority === 'Medium'
                          ? 'medium'
                          : 'low'
                      }
                    >
                      {plan.priority} Priority
                    </Badge>
                  </div>

                  <h4
                    className={`text-base font-bold ${
                      plan.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {plan.topic}
                  </h4>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <div>
                      <p className="font-semibold text-slate-400">Allocated Time:</p>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {plan.availableTime} Minutes ({Math.round(plan.availableTime / 60 * 10) / 10}h)
                      </p>
                    </div>
                    {plan.examDate && (
                      <div>
                        <p className="font-semibold text-slate-400">Target Date:</p>
                        <p className="font-bold text-slate-800 dark:text-slate-200">
                          {formatDate(plan.examDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Button
                    variant={plan.completed ? 'secondary' : 'outline'}
                    size="sm"
                    icon={plan.completed ? CheckCircle : Circle}
                    onClick={() => togglePlanCompleted(plan.id)}
                    className={
                      plan.completed
                        ? 'text-emerald-600'
                        : 'border-red-600 text-red-600 hover:bg-red-50'
                    }
                  >
                    {plan.completed ? 'Completed' : 'Mark Done'}
                  </Button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingPlan(plan);
                        setIsPlanModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPlanToDelete(plan)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Sessions History Table/List */
        sessions.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="No study sessions recorded yet"
            description="Use the timer above or log a completed study session."
            actionLabel="Log Session"
            onAction={() => setIsSessionModalOpen(true)}
          />
        ) : (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3">Subject</th>
                  <th className="pb-3 px-3">Topic Studied</th>
                  <th className="pb-3 px-3">Duration</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sessions.map((sess) => (
                  <tr key={sess.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-300">
                      {formatDate(sess.date)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-extrabold uppercase px-2 py-0.5 rounded bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-900">
                        {sess.subject}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800 dark:text-white">
                      {sess.topic || 'General Revision'}
                    </td>
                    <td className="py-3 px-3 font-bold text-red-600 dark:text-red-400">
                      {sess.duration} mins
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSessionToDelete(sess)}
                        className="p-1 rounded text-slate-400 hover:text-red-600"
                        title="Delete Session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Plan Modal */}
      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onSubmit={handleSavePlan}
        subjects={subjects}
        initialData={editingPlan}
      />

      {/* Manual Session Modal */}
      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        onSubmit={handleSaveSession}
        subjects={subjects}
      />

      {/* Delete Plan Confirm */}
      <ConfirmDialog
        isOpen={!!planToDelete}
        onClose={() => setPlanToDelete(null)}
        onConfirm={() => deletePlan(planToDelete?.id)}
        title="Delete Study Plan"
        message={`Delete plan for "${planToDelete?.topic}"?`}
        confirmText="Delete"
      />

      {/* Delete Session Confirm */}
      <ConfirmDialog
        isOpen={!!sessionToDelete}
        onClose={() => setSessionToDelete(null)}
        onConfirm={() => deleteSession(sessionToDelete?.id)}
        title="Delete Study Session"
        message="Delete this logged study session entry?"
        confirmText="Delete"
      />
    </div>
  );
};
