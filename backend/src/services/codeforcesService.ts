import axios from 'axios';

export interface CodeforcesProblem {
  contestId: number;
  index: string;
  name: string;
  type: string;
  points?: number;
  rating?: number;
  tags: string[];
}

export interface CodeforcesResponse {
  status: string;
  result: {
    problems: CodeforcesProblem[];
    problemStatistics: Array<{
      contestId: number;
      index: string;
      solvedCount: number;
    }>;
  };
}

class CodeforcesService {
  private baseURL = 'https://codeforces.com/api';

  async getProblems(ratingMin: number, ratingMax: number, topic?: string): Promise<CodeforcesProblem[]> {
    try {
      const response = await axios.get<CodeforcesResponse>(`${this.baseURL}/problemset.problems`);
      
      if (response.data.status !== 'OK') {
        throw new Error('Codeforces API returned error');
      }

      let problems = response.data.result.problems;

      // Filter by rating range (only problems with ratings)
      problems = problems.filter(problem => 
        problem.rating && 
        problem.rating >= ratingMin && 
        problem.rating <= ratingMax
      );

      // Filter by topic if provided
      if (topic) {
        const topicLower = topic.toLowerCase();
        problems = problems.filter(problem => 
          problem.tags && problem.tags.length > 0 &&
          problem.tags.some(tag => 
            tag.toLowerCase().includes(topicLower) ||
            topicLower.includes(tag.toLowerCase())
          )
        );
      }

      // Shuffle and limit to 50 problems for better performance
      const shuffled = problems.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 50);
    } catch (error) {
      console.error('Error fetching Codeforces problems:', error);
      throw new Error('Failed to fetch Codeforces problems');
    }
  }

  formatProblem(problem: CodeforcesProblem) {
    return {
      id: `${problem.contestId}${problem.index}`,
      title: problem.name,
      difficulty: this.getDifficultyFromRating(problem.rating || 0),
      topic: problem.tags[0] || 'general',
      tags: problem.tags,
      url: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`,
      source: 'codeforces' as const,
      rating: problem.rating,
    };
  }

  private getDifficultyFromRating(rating: number): string {
    if (rating < 1200) return 'easy';
    if (rating < 1600) return 'medium';
    if (rating < 2000) return 'hard';
    return 'expert';
  }
}

export default new CodeforcesService();
