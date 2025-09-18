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

export const sheets: Record<string, { meta: SheetMeta; problems: SheetProblemItem[] }> = {
  striver: {
    meta: {
      key: 'striver',
      title: "Striver's A2Z DSA Sheet",
      author: 'Striver',
      description: 'Curated progression of DSA topics and problems.',
      topics: ['array', 'string', 'linked-list', 'stack', 'queue', 'tree', 'graph', 'dp'],
      total: 30,
      referenceUrl: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    },
    problems: [
      { id: 'LC-1', title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', topic: 'array', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-121', title: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', topic: 'array', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-217', title: 'Contains Duplicate', url: 'https://leetcode.com/problems/contains-duplicate/', topic: 'array', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-238', title: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self/', topic: 'array', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-20', title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', topic: 'stack', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-21', title: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', topic: 'linked-list', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-141', title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', topic: 'linked-list', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-704', title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', topic: 'binary-search', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-347', title: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', topic: 'heap', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-70', title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', topic: 'dp', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-53', title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', topic: 'array', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-125', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/', topic: 'string', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-3', title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', topic: 'string', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-560', title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', topic: 'array', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-15', title: '3Sum', url: 'https://leetcode.com/problems/3sum/', topic: 'array', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-2', title: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers/', topic: 'linked-list', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-206', title: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', topic: 'linked-list', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-234', title: 'Palindrome Linked List', url: 'https://leetcode.com/problems/palindrome-linked-list/', topic: 'linked-list', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-94', title: 'Binary Tree Inorder Traversal', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', topic: 'tree', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-102', title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-transversal/', topic: 'tree', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-226', title: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/', topic: 'tree', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-543', title: 'Diameter of Binary Tree', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', topic: 'tree', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-141', title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', topic: 'linked-list', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-200', title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', topic: 'graph', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-207', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', topic: 'graph', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-78', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/', topic: 'backtracking', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-46', title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', topic: 'backtracking', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-322', title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', topic: 'dp', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-198', title: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', topic: 'dp', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-300', title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', topic: 'dp', difficulty: 'medium', source: 'leetcode' },
    ],
  },
  babbar: {
    meta: {
      key: 'babbar',
      title: "Love Babbar's 450 DSA Sheet",
      author: 'Love Babbar',
      description: '450 classic DSA problems across core topics.',
      topics: ['array', 'string', 'linked-list', 'stack', 'queue', 'tree', 'graph', 'search', 'dp'],
      total: 30,
      referenceUrl: 'https://www.codingninjas.com/codestudio/guided-paths/coding-interview-questions',
    },
    problems: [
      { id: 'GFG-rotate-array', title: 'Rotate Array', url: 'https://www.geeksforgeeks.org/array-rotation/', topic: 'array', difficulty: 'easy', source: 'gfg' },
      { id: 'LC-53', title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', topic: 'array', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-75', title: 'Sort Colors', url: 'https://leetcode.com/problems/sort-colors/', topic: 'array', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-73', title: 'Set Matrix Zeroes', url: 'https://leetcode.com/problems/set-matrix-zeroes/', topic: 'matrix', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-160', title: 'Intersection of Two Linked Lists', url: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', topic: 'linked-list', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-234', title: 'Palindrome Linked List', url: 'https://leetcode.com/problems/palindrome-linked-list/', topic: 'linked-list', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-94', title: 'Binary Tree Inorder Traversal', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', topic: 'tree', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-102', title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-transversal/', topic: 'tree', difficulty: 'medium', source: 'leetcode' },
      { id: 'CF-339A', title: 'Helpful Maths', url: 'https://codeforces.com/problemset/problem/339/A', topic: 'strings', difficulty: 'easy', source: 'codeforces' },
      { id: 'LC-198', title: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', topic: 'dp', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-1', title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', topic: 'array', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-2', title: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers/', topic: 'linked-list', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-20', title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', topic: 'stack', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-121', title: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', topic: 'array', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-347', title: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', topic: 'heap', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-238', title: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self/', topic: 'array', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-3', title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', topic: 'string', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-125', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/', topic: 'string', difficulty: 'easy', source: 'leetcode' },
      { id: 'LC-560', title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', topic: 'array', difficulty: 'medium', source: 'leetcode' },
      { id: 'CF-282A', title: 'Bit++', url: 'https://codeforces.com/problemset/problem/282/A', topic: 'implementation', difficulty: 'easy', source: 'codeforces' },
      { id: 'CF-4A', title: 'Watermelon', url: 'https://codeforces.com/problemset/problem/4/A', topic: 'math', difficulty: 'easy', source: 'codeforces' },
      { id: 'CF-71A', title: 'Way Too Long Words', url: 'https://codeforces.com/problemset/problem/71/A', topic: 'strings', difficulty: 'easy', source: 'codeforces' },
      { id: 'CF-158A', title: 'Next Round', url: 'https://codeforces.com/problemset/problem/158/A', topic: 'implementation', difficulty: 'easy', source: 'codeforces' },
      { id: 'LC-200', title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', topic: 'graph', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-207', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', topic: 'graph', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-78', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/', topic: 'backtracking', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-46', title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', topic: 'backtracking', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-322', title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', topic: 'dp', difficulty: 'medium', source: 'leetcode' },
      { id: 'LC-300', title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', topic: 'dp', difficulty: 'medium', source: 'leetcode' },
    ],
  },
};

export function listSheets(): SheetMeta[] {
  return Object.values(sheets).map((s) => s.meta);
}

export function getSheetProblems(key: string): SheetProblemItem[] | null {
  const sheet = sheets[key];
  return sheet ? sheet.problems : null;
}


