import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private client: GoogleGenerativeAI | null = null;

  private getClient(): GoogleGenerativeAI {
    if (!this.client) {
      const key = 'AIzaSyDCsQ1NpmZU581-g--sJGSCG2PI2x-YnHI';
      if (!key) {
        throw new Error('Gemini not configured');
      }
      this.client = new GoogleGenerativeAI(key);
    }
    return this.client;
  }

  isConfigured(): boolean {
    return !!process.env.GEMINI_API_KEY;
  }

  async generateExplanation(input: { title: string; url?: string; details?: string }) {
    const model = this.getClient().getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const prompt = `You are an experienced DSA mentor. Explain the problem clearly and concisely.
Problem Title: ${input.title}
Reference URL: ${input.url || 'N/A'}
Additional Details: ${input.details || 'N/A'}

Provide:
1) Intuition (2-4 sentences)
2) Approach (steps)
3) Time & Space complexity
`;
    const resp = await model.generateContent(prompt);
    return resp.response.text();
  }

  async generateHints(input: { title: string; url?: string; currentThought?: string }) {
    const model = this.getClient().getGenerativeModel({ model: 'gemini-2.5-pro' });
    const prompt = `Provide 3 progressively revealing hints for this problem without giving the final answer.
Problem: ${input.title}
Reference: ${input.url || 'N/A'}
Student's current thought: ${input.currentThought || 'N/A'}
`;
    const resp = await model.generateContent(prompt);
    return resp.response.text();
  }

  async generateSolution(input: { title: string; url?: string; language: 'c' | 'cpp' | 'java' }) {
    const model = this.getClient().getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const languageName = input.language === 'cpp' ? 'C++' : input.language === 'java' ? 'Java' : 'C';
    const prompt = `Provide a clean, idiomatic ${languageName} solution for the following problem.
Problem: ${input.title}
Reference: ${input.url || 'N/A'}

Output strictly in a single code block with only the code, no extra commentary.`;
    const resp = await model.generateContent(prompt);
    return resp.response.text();
  }
}

export default new GeminiService();

