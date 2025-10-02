'use client';

import { Problem } from '@/types';
import { storage } from '@/lib/storage';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface ProblemCardProps {
  problem: Problem;
  onBookmark?: (problemId: string) => void;
  onSolve?: (problemId: string) => void;
}

export default function ProblemCard({ problem, onBookmark, onSolve }: ProblemCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiTitle, setAiTitle] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiText, setAiText] = useState('');
  const [aiTab, setAiTab] = useState<'explain' | 'hints' | 'solution'>('explain');
  const [solutionLang, setSolutionLang] = useState<'c' | 'cpp' | 'java'>('cpp');

  // Initialize bookmark and solved states
  useEffect(() => {
    setIsBookmarked(storage.isBookmarked(problem.id));
    setIsSolved(storage.isSolved(problem.id));
  }, [problem.id]);

  const handleBookmark = () => {
    if (isBookmarked) {
      storage.removeBookmark(problem.id);
      setIsBookmarked(false);
    } else {
      storage.addBookmark(problem.id);
      setIsBookmarked(true);
    }
    onBookmark?.(problem.id);
  };

  const handleSolve = () => {
    if (isSolved) {
      storage.removeSolved(problem.id);
      setIsSolved(false);
    } else {
      storage.addSolved(problem.id);
      setIsSolved(true);
    }
    onSolve?.(problem.id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'leetcode':
        return 'bg-orange-100 text-orange-800';
      case 'codeforces':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const callExplain = async () => {
    setAiOpen(true);
    setAiTitle('AI Explanation');
    setAiTab('explain');
    setAiLoading(true);
    setAiError(null);
    setAiText('');
    try {
      const res = await api.aiExplain({ title: problem.title, url: problem.url });
      if (res.success) setAiText(res.data as unknown as string);
      else setAiError(res.message || 'Failed to get explanation');
    } catch (e) {
      setAiError('Failed to get explanation');
    } finally {
      setAiLoading(false);
    }
  };

  const callHints = async () => {
    setAiOpen(true);
    setAiTitle('AI Hints');
    setAiTab('hints');
    setAiLoading(true);
    setAiError(null);
    setAiText('');
    try {
      const res = await api.aiHints({ title: problem.title, url: problem.url });
      if (res.success) setAiText(res.data as unknown as string);
      else setAiError(res.message || 'Failed to get hints');
    } catch (e) {
      setAiError('Failed to get hints');
    } finally {
      setAiLoading(false);
    }
  };

  const callSolution = async () => {
    setAiOpen(true);
    setAiTitle('AI Solution');
    setAiTab('solution');
    setAiLoading(true);
    setAiError(null);
    setAiText('');
    try {
      const res = await api.aiSolution({ title: problem.title, url: problem.url, language: solutionLang });
      if (res.success) setAiText(res.data as unknown as string);
      else setAiError(res.message || 'Failed to get solution');
    } catch (e) {
      setAiError('Failed to get solution');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {problem.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(problem.source)}`}>
                {problem.source}
              </span>
              {problem.rating && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {problem.rating}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked
                  ? 'text-yellow-500 hover:text-yellow-600'
                  : 'text-gray-400 hover:text-yellow-500'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              onClick={handleSolve}
              className={`p-2 rounded-full transition-colors ${
                isSolved
                  ? 'text-green-500 hover:text-green-600'
                  : 'text-gray-400 hover:text-green-500'
              }`}
              aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
            >
              <svg className="w-5 h-5" fill={isSolved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Topic:</span> {problem.topic}
          </div>
          {problem.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {problem.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {problem.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  +{problem.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Solve on {problem.source === 'leetcode' ? 'LeetCode' : 'Codeforces'}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <div className="flex gap-2">
            <button onClick={callExplain} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md">Explain</button>
            <button onClick={callHints} className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-md">Hints</button>
            <button onClick={callSolution} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-md">Solution</button>
          </div>
          {problem.acceptanceRate && (
            <span className="text-sm text-gray-500">
              {problem.acceptanceRate.toFixed(1)}% acceptance
            </span>
          )}
        </div>
      </div>
      {aiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setAiOpen(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">{aiTitle}</h4>
              <button onClick={() => setAiOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="px-4 pt-3 pb-4 max-h-[70vh] overflow-auto">
              <div className="flex items-center gap-2 mb-3">
                <button onClick={callExplain} className={`text-xs px-2 py-1 rounded ${aiTab==='explain'?'bg-indigo-600 text-white':'bg-gray-200 text-gray-700'}`}>Explain</button>
                <button onClick={callHints} className={`text-xs px-2 py-1 rounded ${aiTab==='hints'?'bg-purple-600 text-white':'bg-gray-200 text-gray-700'}`}>Hints</button>
                <div className="ml-auto flex items-center gap-2">
                  <select value={solutionLang} onChange={(e)=>setSolutionLang(e.target.value as any)} className="text-xs bg-gray-100 text-gray-900 rounded px-2 py-1">
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                  </select>
                  <button onClick={callSolution} className={`text-xs px-2 py-1 rounded ${aiTab==='solution'?'bg-emerald-600 text-white':'bg-gray-200 text-gray-700'}`}>Solution</button>
                </div>
              </div>
              {aiLoading && <div className="text-sm text-gray-600">Generating…</div>}
              {aiError && <div className="text-sm text-red-600">{aiError}</div>}
              {!aiLoading && !aiError && (
                <pre className="whitespace-pre-wrap text-sm text-gray-900">{aiText}</pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}