import React from 'react';
import { QUICK_PROMPTS } from '../../data/mockAIResponses';
import { Sparkles } from 'lucide-react';

export const PromptChips = ({ onSelectPrompt }) => {
  return (
    <div className="py-2">
      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-red-600" />
        <span>Quick Academic Prompts:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(p.prompt, p.category)}
            className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/30 text-slate-700 dark:text-slate-200 transition-all font-medium text-left shadow-sm active:scale-95"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};
