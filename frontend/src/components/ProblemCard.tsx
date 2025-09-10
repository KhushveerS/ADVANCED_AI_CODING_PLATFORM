'use client';

import { Problem } from '@/types';
import { storage } from '@/lib/storage';
import { useState } from 'react';

interface ProblemCardProps {
  problem: Problem;
  onBookmark?: (problemId: string) => void;
  onSolve?: (problemId: string) => void;
}

export default function ProblemCard({ problem, onBookmark, onSolve }: ProblemCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(storage.isBookmarked(problem.id));
  const [isSolved, setIsSolved] = useState(storage.isSolved(problem.id));

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
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'leetcode':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'codeforces':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
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
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
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
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-medium">Topic:</span> {problem.topic}
          </div>
          {problem.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {problem.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {problem.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
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
          {problem.acceptanceRate && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {problem.acceptanceRate.toFixed(1)}% acceptance
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
