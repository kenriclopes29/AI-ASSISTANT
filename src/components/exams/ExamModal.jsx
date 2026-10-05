import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { toInputDateFormat } from '../../utils/dateUtils';

const EXAM_TYPES = ['Midterm', 'Final', 'Quiz', 'Practical', 'Viva', 'Assignment'];

export const ExamModal = ({
  isOpen,
  onClose,
  onSubmit,
  subjects = [],
  initialData = null
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(toInputDateFormat());
  const [type, setType] = useState('Midterm');
  const [status, setStatus] = useState('Upcoming');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSubject(initialData.subject || (subjects[0]?.code || ''));
      setDate(initialData.date || toInputDateFormat());
      setType(initialData.type || 'Midterm');
      setStatus(initialData.status || 'Upcoming');
    } else {
      setTitle('');
      setSubject(subjects[0]?.code || 'CS101');
      setDate(toInputDateFormat());
      setType('Midterm');
      setStatus('Upcoming');
    }
    setErrors({});
  }, [initialData, isOpen, subjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Exam title cannot be empty';
    if (!date) newErrors.date = 'Exam date is required';
    if (!subject) newErrors.subject = 'Please assign a subject';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      subject,
      date,
      type,
      status
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Exam' : 'Schedule New Exam'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Exam Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Midterm: Programming in C & Pointers"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.title
                ? 'border-red-500'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.title}
            </p>
          )}
        </div>

        {/* Subject & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Subject *
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
              {subjects.length === 0 && <option value="GENERAL">General</option>}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Assessment Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {EXAM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exam Date & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Exam Date *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Update Exam' : 'Schedule Exam'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
