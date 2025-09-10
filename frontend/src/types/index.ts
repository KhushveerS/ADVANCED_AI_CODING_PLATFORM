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
