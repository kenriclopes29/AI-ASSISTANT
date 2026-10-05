import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { toInputDateFormat } from '../../utils/dateUtils';

export const SessionModal = ({
  isOpen,
  onClose,
  onSubmit,
  subjects = [],
  initialData = null
}) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(45); // minutes
  const [date, setDate] = useState(toInputDateFormat());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setSubject(initialData.subject || (subjects[0]?.code || ''));
      setTopic(initialData.topic || '');
      setDuration(initialData.duration || 45);
      setDate(initialData.date || toInputDateFormat());
    } else {
      setSubject(subjects[0]?.code || 'CS101');
      setTopic('');
      setDuration(45);
      setDate(toInputDateFormat());
    }
    setErrors({});
  }, [initialData, isOpen, subjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!topic.trim()) newErrors.topic = 'Study topic is required';
    if (!subject) newErrors.subject = 'Subject is required';
    if (!date) newErrors.date = 'Date is required';

    const durNum = Number(duration);
    if (isNaN(durNum) || durNum <= 0) {
      newErrors.duration = 'Study duration must be greater than 0 minutes (no negative or zero time)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      subject,
      topic: topic.trim(),
      duration: Math.round(Number(duration)),
      date
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Study Session' : 'Record Study Session'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Subject Studied *
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
          </select>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Topic Covered *
          </label>
          <input
            type="text"
            placeholder="e.g. Practiced Binary Trees & In-Order Traversal"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.topic
                ? 'border-red-500'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          />
          {errors.topic && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.topic}
            </p>
          )}
        </div>

        {/* Duration & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Duration (Minutes) *
            </label>
            <input
              type="number"
              min="5"
              max="720"
              step="5"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.duration && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
                {errors.duration}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Date *
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
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Update Session' : 'Record Session'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
