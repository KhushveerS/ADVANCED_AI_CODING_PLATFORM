// Simple interface for fallback problems
interface Problem {
  id: string;
  title: string;
  difficulty: string;
  topic: string;
  tags: string[];
  url: string;
  source: 'leetcode' | 'codeforces';
  rating?: number;
  acceptanceRate?: number;
}

export const fallbackDSAProblems: Partial<Problem>[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'easy',
    topic: 'array',
    tags: ['array', 'hash-table'],
    url: 'https://leetcode.com/problems/two-sum/',
    source: 'leetcode',
    acceptanceRate: 45.5,
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'medium',
    topic: 'linked-list',
    tags: ['linked-list', 'math', 'recursion'],
    url: 'https://leetcode.com/problems/add-two-numbers/',
    source: 'leetcode',
    acceptanceRate: 35.4,
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    topic: 'string',
    tags: ['hash-table', 'string', 'sliding-window'],
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    source: 'leetcode',
    acceptanceRate: 31.1,
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    topic: 'array',
    tags: ['array', 'binary-search', 'divide-and-conquer'],
    url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    source: 'leetcode',
    acceptanceRate: 30.2,
  },
  {
    id: '5',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium',
    topic: 'string',
    tags: ['string', 'dynamic-programming'],
    url: 'https://leetcode.com/problems/longest-palindromic-substring/',
    source: 'leetcode',
    acceptanceRate: 30.8,
  },
];

export const fallbackCPProblems: Partial<Problem>[] = [
  {
    id: '1A',
    title: 'Theatre Square',
    difficulty: 'easy',
    topic: 'math',
    tags: ['math'],
    url: 'https://codeforces.com/problemset/problem/1/A',
    source: 'codeforces',
    rating: 1000,
  },
  {
    id: '4A',
    title: 'Watermelon',
    difficulty: 'easy',
    topic: 'math',
    tags: ['math'],
    url: 'https://codeforces.com/problemset/problem/4/A',
    source: 'codeforces',
    rating: 800,
  },
  {
    id: '71A',
    title: 'Way Too Long Words',
    difficulty: 'easy',
    topic: 'strings',
    tags: ['strings'],
    url: 'https://codeforces.com/problemset/problem/71/A',
    source: 'codeforces',
    rating: 800,
  },
  {
    id: '158A',
    title: 'Next Round',
    difficulty: 'easy',
    topic: 'implementation',
    tags: ['implementation'],
    url: 'https://codeforces.com/problemset/problem/158/A',
    source: 'codeforces',
    rating: 800,
  },
  {
    id: '282A',
    title: 'Bit++',
    difficulty: 'easy',
    topic: 'implementation',
    tags: ['implementation'],
    url: 'https://codeforces.com/problemset/problem/282/A',
    source: 'codeforces',
    rating: 800,
  },
];
