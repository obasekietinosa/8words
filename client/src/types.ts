export interface WordSetSummary {
  id: number;
  title: string;
  published_at: string | null;
}

export interface WordSet {
  id: number;
  title: string;
  type: string;
  words: string; // Comma separated list of words
  published_at: string | null;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  wordSet: WordSet;
  currentWordIndex: number;
  guesses: string[];
  status: GameStatus;
  isRevealed: boolean;
}
