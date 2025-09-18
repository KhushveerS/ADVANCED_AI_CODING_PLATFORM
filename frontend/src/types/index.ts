export interface Problem {
  id: string;
  title: string;
  difficulty: string;
  topic: string;
  tags: string[];
  url: string;
  source: 'leetcode' | 'codeforces';
  rating?: number;
  acceptanceRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  source?: 'cache' | 'api';
  message?: string;
}

export interface SheetMeta {
  key: string;
  title: string;
  author: string;
  description: string;
  topics: string[];
  total: number;
  referenceUrl?: string;
}

export interface SheetProblemItem {
  id: string;
  title: string;
  url: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source: 'leetcode' | 'codeforces' | 'gfg' | 'other';
}

export interface Note {
  id: string;
  problemId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Progress {
  solved: string[];
  bookmarked: string[];
  notes: Note[];
}
