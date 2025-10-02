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

export interface CodeforcesContest {
  id: number;
  name: string;
  type: string;
  phase: string;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
  preparedBy?: string;
  websiteUrl?: string;
  description?: string;
  difficulty?: number;
  kind?: string;
  icpcRegion?: string;
  country?: string;
  city?: string;
  season?: string;
}

export interface CodeforcesResponse<T> {
  status: string;
  result: T;
}

class CodeforcesService {
  private baseURL = 'https://codeforces.com/api';

  async getProblems(ratingMin: number, ratingMax: number, topic?: string): Promise<CodeforcesProblem[]> {
    try {
      const response = await axios.get<CodeforcesResponse<{ problems: CodeforcesProblem[], problemStatistics: any[] }>>(`${this.baseURL}/problemset.problems`);
      
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

      // Shuffle and limit to 1000 problems for better variety
      const shuffled = problems.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 1000);
    } catch (error) {
      console.error('Error fetching Codeforces problems:', error);
      throw new Error('Failed to fetch Codeforces problems');
    }
  }

  async getContests(): Promise<CodeforcesContest[]> {
    try {
      const response = await axios.get<CodeforcesResponse<CodeforcesContest[]>>(`${this.baseURL}/contest.list`);
      
      if (response.data.status !== 'OK') {
        throw new Error('Codeforces API returned error');
      }

      // Filter to only include upcoming and current contests
      const now = Math.floor(Date.now() / 1000);
      const contests = response.data.result.filter(contest => 
        contest.phase === 'BEFORE' || contest.phase === 'CODING'
      );

      // Sort by start time (soonest first)
      contests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);

      return contests;
    } catch (error) {
      console.error('Error fetching Codeforces contests:', error);
      throw new Error('Failed to fetch Codeforces contests');
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

  formatContest(contest: CodeforcesContest) {
    const now = Math.floor(Date.now() / 1000);
    let status: 'upcoming' | 'ongoing' | 'ended' = 'ended';
    
    if (contest.phase === 'BEFORE') {
      status = 'upcoming';
    } else if (contest.phase === 'CODING') {
      status = 'ongoing';
    }

    // Convert duration from seconds to human readable format
    const hours = Math.floor(contest.durationSeconds / 3600);
    const minutes = Math.floor((contest.durationSeconds % 3600) / 60);
    const duration = `${hours}h ${minutes}m`;

    // Convert start time to readable format
    const startDate = new Date(contest.startTimeSeconds * 1000);
    const date = startDate.toISOString().replace('T', ' ').substring(0, 16) + ' UTC';

    return {
      id: contest.id.toString(),
      name: contest.name,
      platform: 'Codeforces',
      date,
      duration,
      status,
      url: `https://codeforces.com/contests/${contest.id}`
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