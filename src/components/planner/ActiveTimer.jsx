import React, { useState, useEffect } from 'react';
import { useStudy } from '../../context/StudyContext';
import { Button } from '../common/Button';
import { Play, Pause, RotateCcw, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ActiveTimer = ({ onSessionSaved }) => {
  const { subjects, addSession } = useStudy();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.code || 'CS101');
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState('stopwatch'); // 'stopwatch' | 'pomodoro'
  const [pomoMinutes, setPomoMinutes] = useState(25);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleToggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const handleFinish = () => {
    const minutes = Math.max(1, Math.round(seconds / 60));
    addSession({
      subject: selectedSubject,
      topic: topic.trim() || 'Focused Study Session',
      duration: minutes,
      date: new Date().toISOString().split('T')[0]
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#dc2626', '#ef4444', '#f87171', '#ffffff']
      });
    } catch {
      // Ignore if confetti fails
    }

    setIsActive(false);
    setSeconds(0);
    setTopic('');
    if (onSessionSaved) onSessionSaved(minutes);
  };

  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            Active Study Session Timer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track real-time study blocks and automatically record them to your progress
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => {
              setMode('stopwatch');
              handleReset();
            }}
            className={`px-3 py-1 rounded-lg transition-colors ${
              mode === 'stopwatch'
                ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => {
              setMode('pomodoro');
              handleReset();
            }}
            className={`px-3 py-1 rounded-lg transition-colors ${
              mode === 'pomodoro'
                ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            25m Pomodoro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Configuration Inputs */}
        <div className="md:col-span-6 space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Topic or Focus Goal
            </label>
            <input
              type="text"
              placeholder="e.g. Solving Unit 3 Exercise Problems"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Right: Digital Timer Display & Controls */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
          <div className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white my-2">
            {formatTime(seconds)}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {isActive ? (
              <span className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                Session in progress... Stay focused!
              </span>
            ) : seconds > 0 ? (
              'Timer paused'
            ) : (
              'Ready to study'
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              size="md"
              variant="primary"
              icon={isActive ? Pause : Play}
              onClick={handleToggleTimer}
            >
              {isActive ? 'Pause' : seconds > 0 ? 'Resume' : 'Start Session'}
            </Button>

            {seconds > 0 && (
              <>
                <Button
                  size="md"
                  variant="secondary"
                  icon={RotateCcw}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  icon={Check}
                  onClick={handleFinish}
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                >
                  Finish & Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
