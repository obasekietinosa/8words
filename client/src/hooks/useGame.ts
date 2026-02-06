import { useState, useEffect, useCallback } from 'react';
import type { WordSet, GameStatus } from '../types';

const MAX_GUESSES = 6;

export function useGame(wordSet: WordSet | null) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [isRevealed, setIsRevealed] = useState(false);

  const words = wordSet ? wordSet.words.split(',') : [];

  useEffect(() => {
    if (wordSet) {
      resetGame();
    }
  }, [wordSet]);

  const resetGame = useCallback(() => {
    setCurrentWordIndex(0);
    setGuesses([]);
    setStatus('playing');
    setIsRevealed(false);
  }, []);

  const submitGuess = useCallback((guess: string) => {
    if (status !== 'playing' || !wordSet) return;

    const targetWord = words[currentWordIndex + 1];

    // Safety check, though shouldn't happen if game logic is right
    if (!targetWord) return;

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTarget = targetWord.trim().toLowerCase();

    if (normalizedGuess === normalizedTarget) {
      // Correct guess
      if (currentWordIndex + 1 === words.length - 1) {
        // We just guessed the last word
        setStatus('won');
        setCurrentWordIndex(prev => prev + 1);
        setGuesses([]);
      } else {
        // Move to next word
        setCurrentWordIndex(prev => prev + 1);
        setGuesses([]);
      }
    } else {
      // Incorrect guess
      const newGuesses = [...guesses, guess];
      setGuesses(newGuesses);
      if (newGuesses.length >= MAX_GUESSES) {
        setStatus('lost');
        setIsRevealed(true);
      }
    }
  }, [wordSet, currentWordIndex, guesses, status, words]);

  return {
    currentWordIndex,
    guesses,
    status,
    isRevealed,
    submitGuess,
    resetGame,
    words,
    maxGuesses: MAX_GUESSES
  };
}
