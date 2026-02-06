import axios from 'axios';
import type { WordSet, WordSetSummary } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api`
});

export const getWordSets = async (): Promise<WordSetSummary[]> => {
  const response = await api.get<WordSetSummary[]>('/word-sets');
  if (!Array.isArray(response.data)) {
    console.error('getWordSets: Expected array but received:', response.data);
    return [];
  }
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
