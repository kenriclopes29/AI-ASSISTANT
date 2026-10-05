import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { toInputDateFormat, offsetDate } from '../../utils/dateUtils';

export const PlanModal = ({
  isOpen,
  onClose,
  onSubmit,
  subjects = [],
  initialData = null
}) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [availableTime, setAvailableTime] = useState(60); // minutes
  const [examDate, setExamDate] = useState(offsetDate(7));
  const [priority, setPriority] = useState('Medium');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setSubject(initialData.subject || (subjects[0]?.code || ''));
      setTopic(initialData.topic || '');
      setAvailableTime(initialData.availableTime || 60);
      setExamDate(initialData.examDate || offsetDate(7));
      setPriority(initialData.priority || 'Medium');
    } else {
      setSubject(subjects[0]?.code || 'CS101');
      setTopic('');
      setAvailableTime(60);
      setExamDate(offsetDate(7));
      setPriority('Medium');
    }
    setErrors({});
  }, [initialData, isOpen, subjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!topic.trim()) newErrors.topic = 'Study topic is required';
    if (!subject) newErrors.subject = 'Subject selection is required';
    const timeNum = Number(availableTime);
    if (isNaN(timeNum) || timeNum <= 0) {
      newErrors.availableTime = 'Available study time must be greater than 0 minutes';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      subject,
      topic: topic.trim(),
      availableTime: Number(availableTime),
      examDate,
      priority
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Study Goal' : 'Create Study Plan'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject */}
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
          </select>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Study Topic / Module *
          </label>
          <input
            type="text"
            placeholder="e.g. Master Pointer Arithmetic & Linked Lists"
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

        {/* Available Time & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Available Time (Minutes) *
            </label>
            <input
              type="number"
              min="10"
              max="600"
              step="5"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.availableTime && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
                {errors.availableTime}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
        </div>

        {/* Target Deadline / Exam Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Target Deadline / Exam Date
          </label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Update Plan' : 'Save Plan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
