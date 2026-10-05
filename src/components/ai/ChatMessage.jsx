import React, { useState } from 'react';
import { formatDateTime } from '../../utils/dateUtils';
import { Bot, User, Copy, Check, Sparkles } from 'lucide-react';

export const ChatMessage = ({ chat }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(chat.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple, clean markdown rendering for headers, lists, code, and bold
  const renderFormattedAnswer = (text) => {
    if (!text) return null;

    // Split text into paragraphs/sections
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeBuffer = [];
    const elements = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${idx}`}
              className="p-3.5 my-2.5 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 font-mono text-xs overflow-x-auto border border-slate-800"
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h4
            key={idx}
            className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1.5 flex items-center gap-1.5"
          >
            {line.replace('### ', '')}
          </h4>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h5
            key={idx}
            className="text-xs font-bold text-red-600 dark:text-red-400 mt-2.5 mb-1"
          >
            {line.replace('#### ', '')}
          </h5>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li
            key={idx}
            className="text-xs text-slate-700 dark:text-slate-300 ml-4 list-disc mb-0.5"
          >
            {line.replace(/^[-*]\s+/, '')}
          </li>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={idx}
            className="border-l-4 border-red-500 pl-3 py-1 my-1.5 text-xs text-slate-600 dark:text-slate-400 bg-red-50/50 dark:bg-red-950/20 rounded-r-lg italic"
          >
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.trim() === '---') {
        elements.push(
          <hr
            key={idx}
            className="my-3 border-slate-200 dark:border-slate-800"
          />
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p
            key={idx}
            className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-1.5"
          >
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Student Question Balloon */}
      <div className="flex justify-end">
        <div className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%]">
          <div className="bg-red-600 text-white p-3.5 rounded-2xl rounded-tr-none shadow-sm text-xs leading-relaxed">
            <p className="font-medium">{chat.question}</p>
            <p className="text-[10px] text-red-200 mt-1.5 text-right">
              {formatDateTime(chat.timestamp)}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 border border-red-200 dark:border-red-900">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* AI Assistant Answer Balloon */}
      <div className="flex justify-start">
        <div className="flex items-start gap-2.5 max-w-[95%] sm:max-w-[85%]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-500/20">
            <Bot className="w-4 h-4" />
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none p-4 shadow-card w-full">
            {/* Header info */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  Study AI Academic Engine
                </span>
                {chat.category && (
                  <span className="text-[10px] bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 font-semibold px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900">
                    {chat.category}
                  </span>
                )}
              </div>

              <button
                onClick={handleCopy}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
                title="Copy Answer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] text-emerald-600 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Answer Content */}
            <div className="prose dark:prose-invert max-w-none">
              {renderFormattedAnswer(chat.answer)}
            </div>

            {/* Academic Simulation Notice */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>Offline Academic Knowledge Synthesizer</span>
              <span>{formatDateTime(chat.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
