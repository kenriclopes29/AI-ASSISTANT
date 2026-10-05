import React, { useState, useRef, useEffect } from 'react';
import { useStudy } from '../context/StudyContext';
import { generateMockAIResponse } from '../data/mockAIResponses';
import { ChatMessage } from '../components/ai/ChatMessage';
import { PromptChips } from '../components/ai/PromptChips';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import {
  Send,
  Trash2,
  Sparkles,
  Bot,
  HelpCircle,
  BookOpen,
  Info
} from 'lucide-react';

export const AIAssistant = () => {
  const { chats, addChat, clearChatHistory } = useStudy();
  const [question, setQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const chatBottomRef = useRef(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, isGenerating]);

  const handleSend = (textToSend = null, category = 'General') => {
    const q = (textToSend || question).trim();
    if (!q || isGenerating) return;

    setQuestion('');
    setIsGenerating(true);

    // Simulate realistic academic typing latency (500ms - 800ms)
    setTimeout(() => {
      const answer = generateMockAIResponse(q);
      addChat({ question: q, answer, category });
      setIsGenerating(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner & Transparency Disclosure */}
      <div className="p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
              AI Academic Study Companion
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-900">
              Demo / Offline Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>
              Demonstration academic knowledge engine. Formats explanations, practice questions, and study plans without third-party API keys.
            </span>
          </p>
        </div>

        {chats.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            className="text-slate-500 hover:text-red-600 self-start sm:self-auto"
            onClick={() => setIsClearModalOpen(true)}
          >
            Clear History
          </Button>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <PromptChips onSelectPrompt={(prompt, cat) => handleSend(prompt, cat)} />

      {/* Chat Messages Log */}
      <div className="min-h-[420px] max-h-[580px] overflow-y-auto space-y-4 p-4 md:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center mb-3">
              <Bot className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">
              Start Your Academic Session
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mt-1">
              Ask any question about C programming, pointers, Discrete Math, Web Tech, Database Normalization, or request practice exam questions.
            </p>
          </div>
        ) : (
          chats.map((chat) => <ChatMessage key={chat.id} chat={chat} />)
        )}

        {/* Loading Indicator */}
        {isGenerating && (
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 animate-pulse p-3">
            <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <span>Synthesizing academic explanation and code examples...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask an academic question, request practice questions, or ask for a study plan..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Button
            type="submit"
            size="md"
            variant="primary"
            disabled={!question.trim() || isGenerating}
            icon={Send}
          >
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>

        <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2">
          Press <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Enter</kbd> to ask. Offline academic database active.
        </p>
      </div>

      {/* Clear Confirmation Modal */}
      <ConfirmDialog
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={clearChatHistory}
        title="Clear Chat History"
        message="Are you sure you want to delete all saved conversations with the AI Study Assistant?"
        confirmText="Clear History"
      />
    </div>
  );
};
