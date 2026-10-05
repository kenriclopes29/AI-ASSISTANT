import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

const COLOR_OPTIONS = [
  '#dc2626', // Red
  '#e11d48', // Rose
  '#b91c1c', // Dark Red
  '#ea580c', // Orange-Red
  '#991b1b', // Ruby
  '#7f1d1d', // Burgundy
  '#d97706', // Amber
  '#475569'  // Slate
];

export const SubjectModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [teacher, setTeacher] = useState('');
  const [color, setColor] = useState('#dc2626');
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCode(initialData.code || '');
      setTeacher(initialData.teacher || '');
      setColor(initialData.color || '#dc2626');
      setProgress(initialData.progress || 0);
    } else {
      setName('');
      setCode('');
      setTeacher('');
      setColor('#dc2626');
      setProgress(0);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Subject name is required';
    if (!code.trim()) newErrors.code = 'Subject code is required (e.g., CS101)';
    if (!teacher.trim()) newErrors.teacher = 'Teacher name is required';

    const progNum = Number(progress);
    if (isNaN(progNum) || progNum < 0 || progNum > 100) {
      newErrors.progress = 'Progress must be between 0% and 100%';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      teacher: teacher.trim(),
      color,
      progress: Number(progress)
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Subject' : 'Add New Subject'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Subject Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Programming in C"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.name
                ? 'border-red-500'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
              {errors.name}
            </p>
          )}
        </div>

        {/* Code & Teacher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Subject Code *
            </label>
            <input
              type="text"
              placeholder="e.g. CS101"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors.code
                  ? 'border-red-500'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.code && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
                {errors.code}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Teacher Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Rajesh Sharma"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors.teacher
                  ? 'border-red-500'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.teacher && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
                {errors.teacher}
              </p>
            )}
          </div>
        </div>

        {/* Progress Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Subject Completion: {progress}%
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full accent-red-600 cursor-pointer"
          />
        </div>

        {/* Color Choice */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Subject Color Tag
          </label>
          <div className="flex items-center gap-3">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full transition-transform ${
                  color === c ? 'scale-125 ring-2 ring-offset-2 ring-red-500' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Changes' : 'Create Subject'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
