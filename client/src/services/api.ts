import axios from 'axios';
import type { WordSet, WordSetSummary } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api`
});

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getWordSets = async (page: number = 1, limit: number = 9): Promise<PaginatedResponse<WordSetSummary>> => {
  const response = await api.get<PaginatedResponse<WordSetSummary>>('/word-sets', {
    params: { page, limit }
  });
  return response.data;
};

export const getWordSet = async (id: number): Promise<WordSet> => {
  const response = await api.get<WordSet>(`/word-sets/${id}`);
  return response.data;
};

export const getRandomWordSetId = async (): Promise<{ id: number }> => {
  const response = await api.get<{ id: number }>('/word-sets/random');
  return response.data;
};
