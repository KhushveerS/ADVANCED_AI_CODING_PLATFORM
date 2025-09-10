import axios from 'axios';

export interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: string;
  topicTags: Array<{ name: string }>;
  acRate: number;
  frontendQuestionId: string;
}

export interface LeetCodeResponse {
  data: {
    problemsetQuestionList: {
      questions: LeetCodeProblem[];
    };
  };
}

class LeetCodeService {
  private baseURL = 'https://leetcode.com/graphql';
  
  private getProblemsQuery = (topic: string, difficulty: string, limit: number = 50) => {
    return {
      query: `
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
          problemsetQuestionList: questionList(
            categorySlug: $categorySlug
            limit: $limit
            skip: $skip
            filters: $filters
          ) {
            total: totalNum
            questions: data {
              acRate
              difficulty
              frontendQuestionId: questionFrontendId
              isFavor
              paidOnly: isPaidOnly
              status
              title
              titleSlug
              topicTags {
                name
                id
                slug
              }
            }
          }
        }
      `,
      variables: {
        categorySlug: "",
        skip: 0,
        limit: limit,
        filters: {
          difficulty: difficulty.toUpperCase(),
          tags: [topic.toLowerCase()]
        }
      }
    };
  };

  async getProblems(topic: string, difficulty: string, limit: number = 50): Promise<LeetCodeProblem[]> {
    try {
      const response = await axios.post<LeetCodeResponse>(this.baseURL, this.getProblemsQuery(topic, difficulty, limit), {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 10000, // 10 second timeout
      });

      if (response.data.data?.problemsetQuestionList?.questions) {
        return response.data.data.problemsetQuestionList.questions;
      } else {
        console.warn('LeetCode API returned unexpected structure, returning empty array');
        return [];
      }
    } catch (error) {
      console.error('Error fetching LeetCode problems:', error);
      // Return empty array instead of throwing to prevent app crash
      console.warn('LeetCode API failed, returning empty array');
      return [];
    }
  }

  formatProblem(problem: LeetCodeProblem, topic: string) {
    return {
      id: problem.frontendQuestionId,
      title: problem.title,
      difficulty: problem.difficulty.toLowerCase(),
      topic: topic,
      tags: problem.topicTags.map(tag => tag.name),
      url: `https://leetcode.com/problems/${problem.title.replace(/\s+/g, '-').toLowerCase()}/`,
      source: 'leetcode' as const,
      acceptanceRate: problem.acRate,
    };
  }
}

export default new LeetCodeService();
