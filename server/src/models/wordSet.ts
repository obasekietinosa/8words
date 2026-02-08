import { query } from '../db';

export interface WordSet {
  id: number;
  title: string;
  type: string;
  words: string;
  published_at: Date | null;
}

export interface WordSetSummary {
  id: number;
  title: string;
  published_at: Date | null;
}

export const findAll = async (page: number = 1, limit: number = 10): Promise<{ wordSets: WordSetSummary[], total: number }> => {
  const offset = (page - 1) * limit;
  const text = 'SELECT id, title, published_at FROM word_sets ORDER BY published_at DESC LIMIT $1 OFFSET $2';
  const countText = 'SELECT COUNT(*) FROM word_sets';

  const [result, countResult] = await Promise.all([
    query<WordSetSummary>(text, [limit, offset]),
    query<{ count: string }>(countText)
  ]);

  return {
    wordSets: result.rows,
    total: parseInt(countResult.rows[0].count, 10)
  };
};

export const findById = async (id: number): Promise<WordSet | null> => {
  const text = 'SELECT * FROM word_sets WHERE id = $1';
  const result = await query<WordSet>(text, [id]);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  return null;
};

export const findRandomId = async (): Promise<number | null> => {
  const text = 'SELECT id FROM word_sets ORDER BY RANDOM() LIMIT 1';
  const result = await query<{ id: number }>(text);
  if (result.rows.length > 0) {
    return result.rows[0].id;
  }
  return null;
};
