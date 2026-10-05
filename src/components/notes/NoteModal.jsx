import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const NoteModal = ({
  isOpen,
  onClose,
  onSubmit,
  subjects = [],
  initialData = null
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSubject(initialData.subject || (subjects[0]?.code || ''));
      setContent(initialData.content || '');
    } else {
      setTitle('');
      setSubject(subjects[0]?.code || 'CS101');
      setContent('');
    }
    setErrors({});
  }, [initialData, isOpen, subjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Note title is required';
    if (!subject) newErrors.subject = 'Please choose a subject';
    if (!content.trim()) newErrors.content = 'Note content cannot be empty';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      subject,
      content: content.trim()
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Study Note' : 'Create Study Note'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Note Title *
          </label>
          <input
            type="text"
            placeholder="e.g. C Pointers & Memory Allocation Cheatsheet"
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

        {/* Subject */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Associated Subject *
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

        {/* Content */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Note Content & Code Snippets *
          </label>
          <textarea
            rows="8"
            placeholder="Type your lecture summary, key formulas, pseudocode, or bullet points here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.content
                ? 'border-red-500'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.content}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Update Note' : 'Save Note'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
