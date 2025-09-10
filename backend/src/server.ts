import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import codeforcesService from './services/codeforcesService';
import leetcodeService from './services/leetcodeService';
import { fallbackDSAProblems, fallbackCPProblems } from './data/fallbackProblems';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test Codeforces API
app.get('/api/test/codeforces', async (req: express.Request, res: express.Response) => {
  try {
    console.log('Testing Codeforces API...');
    const problems = await codeforcesService.getProblems(1200, 1500, 'dp');
    console.log(`Found ${problems.length} Codeforces problems`);
    
    res.json({
      success: true,
      message: `Found ${problems.length} problems`,
      sample: problems.slice(0, 3).map(p => ({
        id: p.contestId + p.index,
        name: p.name,
        rating: p.rating,
        tags: p.tags
      }))
    });
  } catch (error) {
    console.error('Codeforces test error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Test LeetCode API
app.get('/api/test/leetcode', async (req: express.Request, res: express.Response) => {
  try {
    console.log('Testing LeetCode API...');
    const problems = await leetcodeService.getProblems('array', 'medium', 5);
    console.log(`Found ${problems.length} LeetCode problems`);
    
    res.json({
      success: true,
      message: `Found ${problems.length} problems`,
      sample: problems.slice(0, 3).map(p => ({
        id: p.frontendQuestionId,
        title: p.title,
        difficulty: p.difficulty,
        tags: p.topicTags.map(t => t.name)
      }))
    });
  } catch (error) {
    console.error('LeetCode test error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DSA Problems (without MongoDB)
app.get('/api/dsa/problems', async (req: express.Request, res: express.Response) => {
  try {
    const { topic = 'array', difficulty = 'medium' } = req.query;

    // Try to fetch from LeetCode API
    const leetcodeProblems = await leetcodeService.getProblems(
      topic as string,
      difficulty as string,
      50
    );

    let problems;
    let source = 'api';

    if (leetcodeProblems.length > 0) {
      problems = leetcodeProblems.map(problem => 
        leetcodeService.formatProblem(problem, topic as string)
      );
    } else {
      // Use fallback data
      console.log('Using fallback DSA problems');
      problems = fallbackDSAProblems.map(problem => ({
        ...problem,
        topic: topic as string,
        difficulty: difficulty as string,
      })) as any[];
      source = 'fallback';
    }

    res.json({
      success: true,
      data: problems,
      source
    });
  } catch (error) {
    console.error('Error fetching DSA problems:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch DSA problems'
    });
  }
});

// CP Problems (without MongoDB)
app.get('/api/cp/problems', async (req: express.Request, res: express.Response) => {
  try {
    const { 
      ratingMin = 1200, 
      ratingMax = 1500, 
      topic 
    } = req.query;

    const ratingMinNum = parseInt(ratingMin as string);
    const ratingMaxNum = parseInt(ratingMax as string);

    // Try to fetch from Codeforces API
    const codeforcesProblems = await codeforcesService.getProblems(
      ratingMinNum,
      ratingMaxNum,
      topic as string
    );

    let problems;
    let source = 'api';

    if (codeforcesProblems.length > 0) {
      problems = codeforcesProblems.map(problem => 
        codeforcesService.formatProblem(problem)
      );
    } else {
      // Use fallback data
      console.log('Using fallback CP problems');
      problems = fallbackCPProblems.map(problem => ({
        ...problem,
        rating: problem.rating || ratingMinNum,
      })) as any[];
      source = 'fallback';
    }

    res.json({
      success: true,
      data: problems,
      source
    });
  } catch (error) {
    console.error('Error fetching CP problems:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch CP problems'
    });
  }
});

// DSA Topics
app.get('/api/dsa/topics', (req: express.Request, res: express.Response) => {
  const topics = [
    'array', 'string', 'hash-table', 'dynamic-programming', 'math',
    'greedy', 'sorting', 'depth-first-search', 'breadth-first-search',
    'tree', 'binary-search', 'matrix', 'two-pointers', 'bit-manipulation',
    'stack', 'heap', 'graph', 'backtracking', 'sliding-window',
    'union-find', 'trie', 'recursion', 'divide-and-conquer'
  ];

  res.json({
    success: true,
    data: topics
  });
});

// DSA Difficulties
app.get('/api/dsa/difficulties', (req: express.Request, res: express.Response) => {
  const difficulties = ['easy', 'medium', 'hard'];

  res.json({
    success: true,
    data: difficulties
  });
});

// CP Topics
app.get('/api/cp/topics', (req: express.Request, res: express.Response) => {
  const topics = [
    'implementation', 'math', 'greedy', 'constructive algorithms',
    'dp', 'graphs', 'trees', 'number theory', 'combinatorics',
    'geometry', 'strings', 'data structures', 'sortings',
    'binary search', 'brute force', 'two pointers', 'bitmasks',
    'dfs and similar', 'shortest paths', 'hashing', 'games',
    'flows', 'dsu', 'divide and conquer', 'probabilities'
  ];

  res.json({
    success: true,
    data: topics
  });
});

// CP Rating Ranges
app.get('/api/cp/rating-ranges', (req: express.Request, res: express.Response) => {
  const ranges = [
    { min: 800, max: 1200, label: 'Beginner' },
    { min: 1200, max: 1600, label: 'Intermediate' },
    { min: 1600, max: 2000, label: 'Advanced' },
    { min: 2000, max: 2400, label: 'Expert' },
    { min: 2400, max: 3000, label: 'Master' }
  ];

  res.json({
    success: true,
    data: ranges
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Test Codeforces: http://localhost:${PORT}/api/test/codeforces`);
  console.log(`Test LeetCode: http://localhost:${PORT}/api/test/leetcode`);
});
