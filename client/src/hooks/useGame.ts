import { useState, useEffect, useCallback } from 'react';
import type { WordSet, GameStatus } from '../types';

const MAX_GUESSES = 6;

export function useGame(wordSet: WordSet | null) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set([0]));

  const words = wordSet ? wordSet.words.split(',') : [];

  const resetGame = useCallback(() => {
    setCurrentWordIndex(0);
    setGuesses([]);
    setMistakes(0);
    setStatus('playing');
    setIsRevealed(false);
    setRevealedIndices(new Set([0]));
  }, []);

  useEffect(() => {
    if (wordSet) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      resetGame();
    }
  }, [wordSet, resetGame]);

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
        setRevealedIndices(new Set([0]));
      } else {
        // Move to next word
        setCurrentWordIndex(prev => prev + 1);
        setGuesses([]);
        setRevealedIndices(new Set([0]));
      }
    } else {
      // Incorrect guess
      setGuesses(prev => [...prev, guess]);
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      // Reveal a random unrevealed character
      const unrevealedIndices: number[] = [];
      for (let i = 0; i < targetWord.length; i++) {
        if (!revealedIndices.has(i)) {
          unrevealedIndices.push(i);
        }
      }

      if (unrevealedIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * unrevealedIndices.length);
        const indexToReveal = unrevealedIndices[randomIndex];
        setRevealedIndices(prev => {
          const newSet = new Set(prev);
          newSet.add(indexToReveal);
          return newSet;
        });
      }

      if (newMistakes >= MAX_GUESSES) {
        setStatus('lost');
        setIsRevealed(true);
      }
    }
  }, [wordSet, currentWordIndex, mistakes, status, words, revealedIndices]);

  return {
    currentWordIndex,
    guesses,
    mistakes,
    status,
    isRevealed,
    revealedIndices,
    submitGuess,
    resetGame,
    words,
    maxGuesses: MAX_GUESSES
  };
}
