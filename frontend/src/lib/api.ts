import { Problem, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // DSA API calls
  async getDSAProblems(topic: string, difficulty: string): Promise<ApiResponse<Problem[]>> {
    const response = await fetch(`${API_BASE_URL}/dsa/problems?topic=${topic}&difficulty=${difficulty}`);
    return response.json();
  },

  async getDSATopics(): Promise<ApiResponse<string[]>> {
    const response = await fetch(`${API_BASE_URL}/dsa/topics`);
    return response.json();
  },

  async getDSADifficulties(): Promise<ApiResponse<string[]>> {
    const response = await fetch(`${API_BASE_URL}/dsa/difficulties`);
    return response.json();
  },

  // CP API calls
  async getCPProblems(ratingMin: number, ratingMax: number, topic?: string): Promise<ApiResponse<Problem[]>> {
    const params = new URLSearchParams({
      ratingMin: ratingMin.toString(),
      ratingMax: ratingMax.toString(),
      ...(topic && { topic })
    });
    const response = await fetch(`${API_BASE_URL}/cp/problems?${params}`);
    return response.json();
  },

  async getCPTopics(): Promise<ApiResponse<string[]>> {
    const response = await fetch(`${API_BASE_URL}/cp/topics`);
    return response.json();
  },

  async getCPRatingRanges(): Promise<ApiResponse<Array<{ min: number; max: number; label: string }>>> {
    const response = await fetch(`${API_BASE_URL}/cp/rating-ranges`);
    return response.json();
  },
};
