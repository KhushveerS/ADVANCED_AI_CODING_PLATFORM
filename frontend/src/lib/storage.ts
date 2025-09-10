import { Progress, Note } from '@/types';

const STORAGE_KEY = 'dsa-cp-progress';

export const storage = {
  getProgress(): Progress {
    if (typeof window === 'undefined') {
      return { solved: [], bookmarked: [], notes: [] };
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { solved: [], bookmarked: [], notes: [] };
      }
    }
    return { solved: [], bookmarked: [], notes: [] };
  },

  saveProgress(progress: Progress): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  addSolved(problemId: string): void {
    const progress = this.getProgress();
    if (!progress.solved.includes(problemId)) {
      progress.solved.push(problemId);
      this.saveProgress(progress);
    }
  },

  removeSolved(problemId: string): void {
    const progress = this.getProgress();
    progress.solved = progress.solved.filter(id => id !== problemId);
    this.saveProgress(progress);
  },

  addBookmark(problemId: string): void {
    const progress = this.getProgress();
    if (!progress.bookmarked.includes(problemId)) {
      progress.bookmarked.push(problemId);
      this.saveProgress(progress);
    }
  },

  removeBookmark(problemId: string): void {
    const progress = this.getProgress();
    progress.bookmarked = progress.bookmarked.filter(id => id !== problemId);
    this.saveProgress(progress);
  },

  addNote(note: Note): void {
    const progress = this.getProgress();
    const existingIndex = progress.notes.findIndex(n => n.id === note.id);
    if (existingIndex >= 0) {
      progress.notes[existingIndex] = note;
    } else {
      progress.notes.push(note);
    }
    this.saveProgress(progress);
  },

  removeNote(noteId: string): void {
    const progress = this.getProgress();
    progress.notes = progress.notes.filter(n => n.id !== noteId);
    this.saveProgress(progress);
  },

  getNotesForProblem(problemId: string): Note[] {
    const progress = this.getProgress();
    return progress.notes.filter(note => note.problemId === problemId);
  },

  isSolved(problemId: string): boolean {
    const progress = this.getProgress();
    return progress.solved.includes(problemId);
  },

  isBookmarked(problemId: string): boolean {
    const progress = this.getProgress();
    return progress.bookmarked.includes(problemId);
  },
};
