'use client';

import { useState, useEffect } from 'react';
import { Problem } from '@/types';
import { api } from '@/lib/api';
import ProblemCard from '@/components/ProblemCard';

export default function DSAPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('array');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTopics();
    loadDifficulties();
  }, []);

  useEffect(() => {
    loadProblems();
  }, [selectedTopic, selectedDifficulty]);

  const loadTopics = async () => {
    try {
      const response = await api.getDSATopics();
      if (response.success) {
        setTopics(response.data);
      }
    } catch (err) {
      console.error('Error loading topics:', err);
    }
  };

  const loadDifficulties = async () => {
    try {
      const response = await api.getDSADifficulties();
      if (response.success) {
        setDifficulties(response.data);
      }
    } catch (err) {
      console.error('Error loading difficulties:', err);
    }
  };

  const loadProblems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getDSAProblems(selectedTopic, selectedDifficulty);
      if (response.success) {
        setProblems(response.data);
      } else {
        setError(response.message || 'Failed to load problems');
      }
    } catch (err) {
      setError('Failed to load problems. Please try again.');
      console.error('Error loading problems:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = (problemId: string) => {
    // Optional: Add any additional logic here
    console.log('Bookmarked problem:', problemId);
  };

  const handleSolve = (problemId: string) => {
    // Optional: Add any additional logic here
    console.log('Solved problem:', problemId);
  };

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Data Structures & Algorithms
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Practice problems from LeetCode organized by topic and difficulty
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic.charAt(0).toUpperCase() + topic.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problems List */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error loading problems
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && problems.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No problems found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}

      {!loading && !error && problems.length > 0 && (
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {problems.length} problems found
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Topic: {selectedTopic} | Difficulty: {selectedDifficulty}
            </div>
          </div>
          <div className="grid gap-4">
            {problems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onBookmark={handleBookmark}
                onSolve={handleSolve}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
