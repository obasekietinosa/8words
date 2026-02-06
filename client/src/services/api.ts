import axios from 'axios';
import type { WordSet, WordSetSummary } from '../types';

const api = axios.create({
  baseURL: '/api'
});

export const getWordSets = async (): Promise<WordSetSummary[]> => {
  const response = await api.get<WordSetSummary[]>('/word-sets');
  return response.data;
};

export const getWordSet = async (id: number): Promise<WordSet> => {
  const response = await api.get<WordSet>(`/word-sets/${id}`);
  return response.data;
};
