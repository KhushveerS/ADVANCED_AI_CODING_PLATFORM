'use client';

import { useState, useEffect } from 'react';
import { Progress, Note } from '@/types';
import { storage } from '@/lib/storage';

export default function NotesPage() {
  const [progress, setProgress] = useState<Progress>({ solved: [], bookmarked: [], notes: [] });
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const savedProgress = storage.getProgress();
    setProgress(savedProgress);
  };

  const handleSaveNote = () => {
    if (!selectedProblemId || !noteContent.trim()) return;

    const note: Note = {
      id: editingNoteId || Date.now().toString(),
      problemId: selectedProblemId,
      content: noteContent.trim(),
      createdAt: editingNoteId ? progress.notes.find(n => n.id === editingNoteId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.addNote(note);
    setNoteContent('');
    setEditingNoteId(null);
    loadProgress();
  };

  const handleEditNote = (note: Note) => {
    setSelectedProblemId(note.problemId);
    setNoteContent(note.content);
    setEditingNoteId(note.id);
  };

  const handleDeleteNote = (noteId: string) => {
    storage.removeNote(noteId);
    loadProgress();
    if (editingNoteId === noteId) {
      setEditingNoteId(null);
      setNoteContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setNoteContent('');
  };

  const getProblemTitle = (problemId: string) => {
    // In a real app, you might want to store problem titles or fetch them
    return `Problem ${problemId}`;
  };

  // Create a Set of unique problem IDs to avoid duplicates
  const allProblemIds = [...new Set([...progress.solved, ...progress.bookmarked])];
  const allProblems = allProblemIds.map(id => ({ id, title: getProblemTitle(id) }));

  // Calculate DSA and CP progress
  const totalSolved = progress.solved.length;
  // In a real implementation, you would filter by source or ID pattern
  // For now, we'll use a simple approach to demonstrate the concept
  const dsaSolved = progress.solved.filter(id => 
    id.startsWith('lc-') || id.startsWith('leetcode-') || !id.includes('cf-')
  ).length;
  const cpSolved = progress.solved.filter(id => 
    id.startsWith('cf-') || id.startsWith('codeforces-') || id.includes('cf-')
  ).length;
  
  // For demonstration, we'll assume totals (in a real app, you'd get these from the APIs)
  const dsaTotal = 100; // This would come from the DSA API
  const cpTotal = 80;   // This would come from the CP API
  const dsaPercentage = Math.min(100, Math.round((dsaSolved / Math.max(1, dsaTotal)) * 100));
  const cpPercentage = Math.min(100, Math.round((cpSolved / Math.max(1, cpTotal)) * 100));

  // Circular progress component
  const CircularProgress = ({ percentage, color, label }: { percentage: number; color: string; label: string }) => {
    const strokeDasharray = `${percentage}, 100`;
    const colorClasses = {
      blue: 'text-blue-600 stroke-blue-600',
      purple: 'text-purple-600 stroke-purple-600'
    };
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            />
            <text x="18" y="20.5" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold">
              {percentage}%
            </text>
          </svg>
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">{label}</p>
        <p className="text-xs text-gray-500">{dsaSolved} / {dsaTotal}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Notes & Progress
        </h1>
        <p className="text-gray-600">
          Track your progress and save personal notes for problems
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Solved</p>
              <p className="text-2xl font-semibold text-gray-900">{progress.solved.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Bookmarked</p>
              <p className="text-2xl font-semibold text-gray-900">{progress.bookmarked.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p className="text-2xl font-semibold text-gray-900">{progress.notes.length}</p>
            </div>
          </div>
        </div>

        {/* Circular Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4 text-center">Progress Overview</h3>
          <div className="flex justify-around">
            <CircularProgress percentage={dsaPercentage} color="#3b82f6" label="DSA" />
            <CircularProgress percentage={cpPercentage} color="#8b5cf6" label="CP" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Notes Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add Note
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Problem
              </label>
              <select
                value={selectedProblemId || ''}
                onChange={(e) => setSelectedProblemId(e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="">Select a problem</option>
                {allProblems.map((problem) => (
                  <option key={problem.id} value={problem.id}>
                    {problem.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note Content
              </label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                placeholder="Write your notes here..."
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleSaveNote}
                disabled={!selectedProblemId || !noteContent.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-md transition-colors"
              >
                {editingNoteId ? 'Update Note' : 'Save Note'}
              </button>
              {editingNoteId && (
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Saved Notes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Saved Notes
          </h2>
          
          {progress.notes.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notes yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by adding notes for your problems.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {progress.notes.map((note) => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {getProblemTitle(note.problemId)}
                    </h3>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {note.content}
                  </p>
                  <p className="text-xs text-gray-500">
                    Updated: {new Date(note.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}