import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { toInputDateFormat } from '../../utils/dateUtils';

export const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  subjects = [],
  initialData = null
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(toInputDateFormat());
  const [priority, setPriority] = useState('Medium');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSubject(initialData.subject || (subjects[0]?.code || ''));
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate || toInputDateFormat());
      setPriority(initialData.priority || 'Medium');
    } else {
      setTitle('');
      setSubject(subjects[0]?.code || 'CS101');
      setDescription('');
      setDueDate(toInputDateFormat());
      setPriority('Medium');
    }
    setErrors({});
  }, [initialData, isOpen, subjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Task title cannot be empty';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    if (!subject) newErrors.subject = 'Please assign a subject';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      subject,
      description: description.trim(),
      dueDate,
      priority
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Task' : 'Add New Task'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Task Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Implement Doubly Linked List in C"
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

        {/* Subject & Priority */}
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

        {/* Due Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Due Date *
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.dueDate && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.dueDate}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Description / Requirements
          </label>
          <textarea
            rows="3"
            placeholder="Details, submission guidelines, textbook question numbers..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
